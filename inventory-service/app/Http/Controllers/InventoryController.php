<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class InventoryController extends Controller
{
    /**
     * Display a listing of records
     */
    public function index(): JsonResponse
    {
        $records = Record::all();
        return response()->json(['data' => $records]);
    }

    /**
     * Display available records
     */
    public function available(): JsonResponse
    {
        $records = Record::where('is_available', true)->get();
        return response()->json(['data' => $records]);
    }

    /**
     * Store a newly created record
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'album' => 'nullable|string|max:255',
            'release_year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'genre' => 'nullable|string|max:100',
            'condition' => 'nullable|string|max:50',
            'catalog_number' => 'nullable|string|max:100|unique:records',
            'label' => 'nullable|string|max:100',
            'cover_image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $record = Record::create($request->all());
        return response()->json(['data' => $record, 'message' => 'Record created successfully'], 201);
    }

    /**
     * Display the specified record
     */
    public function show(string $id): JsonResponse
    {
        $record = Record::findOrFail($id);
        return response()->json(['data' => $record]);
    }

    /**
     * Update the specified record
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $record = Record::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'artist' => 'sometimes|string|max:255',
            'album' => 'nullable|string|max:255',
            'release_year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'genre' => 'nullable|string|max:100',
            'condition' => 'nullable|string|max:50',
            'catalog_number' => 'nullable|string|max:100|unique:records,catalog_number,' . $id,
            'label' => 'nullable|string|max:100',
            'cover_image' => 'nullable|string',
            'description' => 'nullable|string',
            'is_available' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $record->update($request->all());
        return response()->json(['data' => $record, 'message' => 'Record updated successfully']);
    }

    /**
     * Remove the specified record
     */
    public function destroy(string $id): JsonResponse
    {
        $record = Record::findOrFail($id);
        $record->delete();
        return response()->json(['message' => 'Record deleted successfully']);
    }

    /**
     * Search for records based on title
     */
    public function search(string $title): JsonResponse
    {
        // Search for records with matching title
        $records = Record::where('title', 'like', '%' . $title . '%')->get();
        
        return response()->json(['data' => $records]);
    }

    /**
     * Update availability status of a record
     */
    public function updateAvailability(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'is_available' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $record = Record::findOrFail($id);
        $record->is_available = $request->is_available;
        $record->save();

        return response()->json([
            'data' => $record,
            'message' => 'Record availability updated successfully'
        ]);
    }
}
