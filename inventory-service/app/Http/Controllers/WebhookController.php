<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class WebhookController extends Controller
{
    /**
     * Handle order update webhook from Order Service
     */
    public function orderUpdate(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|string',
            'status' => 'required|string|in:created,completed,cancelled',
            'items' => 'required|array',
            'items.*.record_id' => 'required|exists:records,id',
        ]);

        if ($validator->fails()) {
            Log::error('Order webhook validation failed', ['errors' => $validator->errors()]);
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Process based on order status
            switch ($request->status) {
                case 'created':
                    // Mark records as unavailable when order is created
                    $this->updateRecordAvailability($request->items, false);
                    break;
                
                case 'cancelled':
                    // Return records to inventory when order is cancelled
                    $this->updateRecordAvailability($request->items, true);
                    break;
                    
                case 'completed':
                    // Handle completed orders (if needed)
                    // This could be used for analytics, reporting, etc.
                    break;
            }

            return response()->json(['message' => 'Order update processed successfully']);
        } catch (\Exception $e) {
            Log::error('Failed to process order webhook', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to process order update'], 500);
        }
    }

    /**
     * Update record availability based on order items
     */
    private function updateRecordAvailability(array $items, bool $isAvailable): void
    {
        foreach ($items as $item) {
            $record = Record::find($item['record_id']);
            
            if ($record) {
                $record->is_available = $isAvailable;
                $record->save();
                
                Log::info('Record availability updated', [
                    'record_id' => $record->id,
                    'availability' => $isAvailable ? 'available' : 'unavailable'
                ]);
            }
        }
    }
}
