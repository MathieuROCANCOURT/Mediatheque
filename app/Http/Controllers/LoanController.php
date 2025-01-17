<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cdIds = $request->input('cd_ids');
        $clientId = $request->user()->id; // Assuming the client is the authenticated user

        foreach ($cdIds as $cdId) {
            Loan::create([
                'cd_id' => $cdId,
                'client_id' => $clientId,
            ]);
        }

        return response()->json(['message' => 'Loans created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
