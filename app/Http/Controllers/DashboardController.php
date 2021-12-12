<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Carbon\Carbon;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{
    public function index()
    {
        $dailyView = Visitor::where('date', Carbon::today())->get()->count();
        $allView = Visitor::all()->count();

        $albums = Album::all();
        $albumNum = $albums->count();
        $imagesNum = 0;
        $albumChartName = [];
        $albumChartView = [];
        $albumImages = [];
        $colors = [];
        foreach ($albums as $album) {
            if (Storage::disk('album-images')->exists($album->id . '/images') && Storage::disk('album-images')->files($album->id . '/images')) {
                $imagesNum += count(Storage::disk('album-images')->files($album->id . '/images'));
                $albumImages[] = count(Storage::disk('album-images')->files($album->id . '/images'));
            }

            $albumChartName[] = $album->name;
            $albumChartView[] = $album->view;
            $colors[] = '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
        }
        $dashboard = ['dailyView' => $dailyView, 'allView' => $allView, 'imagesNum' => $imagesNum, 'albumNum' => $albumNum];


        $weeklyVisitors = Visitor::all()->groupBy(function ($val) {
            return Carbon::parse($val->date)->format('W');
        })->take(30);
        $weeklyVisitorsWeek = [];
        $weeklyVisitorsView = [];

        $monthlyVisitors = Visitor::all()->groupBy(function ($val) {
            return Carbon::parse($val->date)->format('M');
        })->take(12);
        $monthlyVisitorsMonth = [];
        $monthlyVisitorsView = [];

        foreach ($monthlyVisitors as $key => $visitor) {
            $monthlyVisitorsMonth[] = $key;
            $monthlyVisitorsView[] = $visitor->count();
        }

        foreach ($weeklyVisitors as $key => $visitor) {
            $weeklyVisitorsWeek[] = $key . ". hét";
            $weeklyVisitorsView[] = $visitor->count();
        }

        return response()->json(['dashboard' => $dashboard, 'albumChartName' => $albumChartName, 'albumChartView' => $albumChartView, 'colors' => $colors, 'albumImages' => $albumImages, 'monthlyVisitorsView' => $monthlyVisitorsView, 'monthlyVisitorsMonth' => $monthlyVisitorsMonth, 'weeklyVisitorsWeek' => $weeklyVisitorsWeek, 'weeklyVisitorsView' => $weeklyVisitorsView], 200);
    }
}