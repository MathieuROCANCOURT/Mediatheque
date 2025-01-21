<?php

namespace App\Http\Controllers;

use App\Models\CD;
use Exception;
use Illuminate\Http\Request;

class CDController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        try {
            $cds = CD::all();
            return response()->json([
                'status' => 'success',
                'data' => $cds
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'artist' => 'required|string',
            'category' => 'required|string|max:255',
            'year' => 'required|integer'
        ]);

        try {
            $cd = CD::create($validatedData);
            return response()->json(data: [
                'status' => 'success',
                'data' => $cd
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request) {
        try {
            $ids = $request->input('ids');
            CD::whereIn('id', $ids)->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'CDs deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
