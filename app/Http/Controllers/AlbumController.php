<?php

namespace App\Http\Controllers;

use ZipArchive;
use App\Models\Album;
use App\Models\Visitor;
use App\Models\Instagram;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Stevebauman\Location\Facades\Location;
use Illuminate\Pagination\LengthAwarePaginator;

class AlbumController extends Controller
{
    public function index()
    {
        $albums = Album::all();

        foreach ($albums as $album) {
            if (Storage::disk('album-images')->exists($album->id) && Storage::disk('album-images')->files($album->id)) {
                $album->image = Storage::disk('album-images')->files($album->id)[0];
            }
        }

        return $albums;
    }

    public function store(Request $request)
    {
        $albums = json_decode($request->album);

        $data = $request->all();
        if (isset($albums->name)) {
            $data['name'] = $albums->name;
            $data['path'] = $albums->path;
        }
        $validator = Validator::make($data, [
            'name' => 'required|string|unique:albums',
            'file' => 'required|mimes:jpg,png,bmp',
            'path' => 'required|string'
        ]);

        $niceNames = array(
            'name' => 'név',
            'file' => 'fájl',
            'path' => 'útvonal'
        );

        $validator->setAttributeNames($niceNames);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()]);
        }

        if (!isset($albums->public)) {
            $albums->public = 0;
        }


        $album = Album::create([
            'name' => $albums->name,
            'public' => (bool) $albums->public,
            'path' => $albums->path
        ]);

        if (!file_exists('storage/album-images/' . $album->id)) {
            mkdir('storage/album-images/' . $album->id, 0755, true);
        }
        $img = Image::make($request->file);
        $img->resize(1280, null, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save('storage/album-images/' . $album->id . '/' . Str::random(40) . '.' . $request->file->extension());

        return response()->json(['success' => "Success", 'album' => $album->id], 200);
    }

    public function edit($id)
    {
        $album = Album::find($id);
        if (Storage::disk('album-images')->exists($album->id) && Storage::disk('album-images')->files($album->id)) {
            $album->image = Storage::disk('album-images')->files($album->id)[0];
        }
        return $album;
    }

    public function update(Request $request)
    {
        $albums = json_decode($request->album);
        $album = Album::find($albums->id);

        $data = $request->all();
        if (isset($albums->name)) {
            $data['name'] = $albums->name;
        }

        $validate = ['name' => 'required|string|max:100'];
        if (isset($request->file)) {
            $validate = array_merge(['name' => 'required|string|max:100'], ['file' => 'mimes:jpg,png,bmp']);
        }

        $validator = Validator::make($data, $validate);

        $niceNames = array(
            'name' => 'név',
            'file' => 'fájl'
        );

        $validator->setAttributeNames($niceNames);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()]);
        }

        if (!isset($albums->public)) {
            $albums->public = 0;
        }

        $album->name = $albums->name;
        $album->public = $albums->public;
        $album->path = $albums->path;

        $album->save();

        if (isset($request->file)) {
            if (Storage::disk('album-images')->exists($album->id) && Storage::disk('album-images')->files($album->id)) {
                Storage::disk('album-images')->delete($albums->image);
            }

            if (!file_exists('storage/album-images/' . $album->id)) {
                mkdir('storage/album-images/' . $album->id, 0755, true);
            }
            $img = Image::make($request->file);
            $img->resize(1280, null, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save('storage/album-images/' . $album->id . '/' . Str::random(40) . '.' . $request->file->extension());
        }

        return response()->json(['success' => "Success"], 200);
    }

    public function destroy($id)
    {
        Album::find($id)->delete();
        Storage::disk('album-images')->deleteDirectory($id);
        return response()->json(['success' => "Success"], 200);
    }

    public function storeImages(Request $request)
    {
        $albums = json_decode($request->album);

        if ($request->file('files')) {
            $data = $request->all();

            $validator = Validator::make($data, ['files.*' => 'required|mimes:jpg,png,bmp']);

            $niceNames = array(
                'file' => 'fájl'
            );

            $validator->setAttributeNames($niceNames);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()]);
            }

            if (!file_exists('storage/album-images/' . strval($albums) . '/images')) {
                mkdir('storage/album-images/' . strval($albums) . '/images', 0755, true);
            }

            foreach ($request->file('files') as $file) {
                $img = Image::make($file);
                $img->resize(1280, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $img->save('storage/album-images/' . strval($albums) . '/images/' . Str::random(40) . '.' . $file->extension());
            }
        }

        $images = [];
        if (Storage::disk('album-images')->exists($albums . '/images') && Storage::disk('album-images')->files($albums . '/images')) {
            $images = Storage::disk('album-images')->files($albums . '/images');
        }
        return response()->json(['success' => "Success", 'images' => $images], 200);
    }

    public function getImages($id)
    {

        $images = [];
        if (Storage::disk('album-images')->exists($id . '/images') && Storage::disk('album-images')->files($id . '/images')) {
            $images = Storage::disk('album-images')->files($id . '/images');
        }

        return $images;
    }

    public function deleteImage(Request $request)
    {
        Storage::disk('album-images')->delete(json_decode($request->image));
        return response()->json(['success' => "Success"], 200);
    }

    public function getPortfolio(Request $request)
    {
        $albums = Album::where('public', true)->get();

        foreach ($albums as $album) {
            if (Storage::disk('album-images')->exists($album->id) && Storage::disk('album-images')->files($album->id)) {
                $album->image = Storage::disk('album-images')->files($album->id)[0];

                if (Storage::disk('album-images')->exists($album->id . '/images') && Storage::disk('album-images')->files($album->id . '/images')) {
                    $album->images = count(Storage::disk('album-images')->files($album->id . '/images'));
                }
            }
        }

        $topAlbums = $albums->sortByDesc('view');
        $topAlbums = $topAlbums->values()->all();
        $ip = $request->ip();
        $location = Location::get($request->ip());
        if ($location && $location->countryName != 'Germany' && Visitor::where('date', today())->where('ip', $ip)->count() < 1) {
            Visitor::create([
                'date' => today(),
                'ip' => $ip,
            ]);
        }

        $instagram = [];
        if (Instagram::first() && (Instagram::first()->created_at)->diffInHours(Carbon::now()) > 6) {
            $instagramApi = json_decode(Http::get('https://www.instagram.com/barbyaronphoto/?__a=1'));
            if ($instagramApi) {
                $instagramApi = $instagramApi->graphql->user->edge_owner_to_timeline_media->edges;
            } else {
                $instagramApi = json_decode(Http::get('https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables=%7B%22id%22:%2237693529802%22,%22first%22:20,%22after%22:null%7D'));
                $instagramApi = $instagramApi->data->user->edge_owner_to_timeline_media->edges;
            }

            Instagram::truncate();
            foreach ($instagramApi as $image) {
                $temp = 'data:image/jpg;base64,' . base64_encode(file_get_contents($image->node->display_url));
                $instagram[] = $temp;
                Instagram::create([
                    'image' => $temp,
                ]);
            }
        } else if (Instagram::first()) {
            $instagram = Instagram::all()->pluck('image');
        }

        return compact('albums', 'topAlbums', 'instagram');
    }


    public function getPortfolioImages(Request $request, $path)
    {
        $album = Album::where('path', $path)->first();

        if (!$album) {
            return response()->json(['error' => "Error"]);
        }
        if (Storage::disk('album-images')->exists($album->id . '/images') && Storage::disk('album-images')->files($album->id . '/images')) {
            $images = Storage::disk('album-images')->files($album->id . '/images');
        }
        if (!isset($images)) {
            return response()->json(['error' => "Error"]);
        }
        if (Cookie::get($album->id) == '') {
            Cookie::queue($album->id, $album->id, 10);

            $album->view = $album->view + 1;
            $album->save();
        }

        $ip = $request->ip();
        $location = Location::get($request->ip());

        if ($location && $location->countryName != 'Germany' && Visitor::where('date', today())->where('ip', $ip)->count() < 1) {
            Visitor::create([
                'date' => today(),
                'ip' => $ip,
            ]);
        }

        $paginated = $this->paginate($images);
        return $paginated;
    }

    public function paginate($items, $perPage = 30, $page = null, $options = ['onEachSide' => 0])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

    public function downloadPortfolioImages($path)
    {
        $album = Album::where('path', $path)->first();

        $zip = new ZipArchive();
        $fileName = $path . '.zip';
        if (File::exists('storage/album-images/' . $album->id . '/images')) {
            $files = File::files('storage/album-images/' . $album->id . '/images');
        } else {
            return response()->json(['error' => "Error"]);
        }
        if (File::exists('zip/' . $fileName)) {
            File::delete('zip/' . $fileName);
        }

        if ($zip->open('zip/' . $fileName, ZipArchive::CREATE) === TRUE) {
            foreach ($files as $value) {
                $relativeNameInZipFile = basename($value);
                $zip->addFile($value, $relativeNameInZipFile);
            }
            $zip->close();
        }

        return response()->json(['success' => "Success", 'fileName' => $fileName], 200);
    }
}