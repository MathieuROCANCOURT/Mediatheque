<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $loans = Loan::with(['cd', 'user'])->get();
        return response()->json([
            'data' => $loans
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $userId = auth()->id();
        $loans = [];

        foreach ($request->cd_ids as $cdId) {
            $loans[] = Loan::create([
                'cd_id' => $cdId,
                'user_id' => $userId,
                'loan_date' => now(),
                'return_date' => now()->addDays(1),
            ]);
        }

        return response()->json([
            'data' => $loans
        ], 201);
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
    public function destroy(string $id) {
        //
    }


    public function returnCDs(Request $request) {
        $loanIds = $request->input('cd_ids');

        foreach ($loanIds as $loanId) {
            $loan = Loan::find($loanId);
            if ($loan) {
                $loan->delete();
            }
        }

        return response()->json(['message' => 'Loans deleted successfully'], 200);
    }
}
