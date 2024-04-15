<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\Message; // Import the Message model



class DarekHome extends Controller
{
    public function index()
    {
        // Fetch properties and their images from the database
        $propertiesWithImages = Property::with('images')->get();

        // Pass the properties with images data to the front end using Inertia
        return Inertia::render('Darek/Home', [
            'propertiesWithImages' => $propertiesWithImages,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->get('query');
        $city = $request->get('city');
        $type = $request->get('type');
        $price = $request->get('price');
    
        $properties = Property::query();
    
        if ($query) {
            $properties->where('city', 'like', "%$query%")
                ->orWhere('location', 'like', "%$query%")
                ->orWhere('status', 'like', "%$query%")
                ->orWhere('property_type', 'like', "%$query%")
                ->orWhere('payment_type', 'like', "%$query%");
        }
    
        if ($city) {
            $properties->where('city', $city);
        }
    
        if ($type) {
            $properties->where('property_type', $type);
        }
    
        if ($price) {
            $properties->where('price', '<=', $price);
        }
    
        $filteredProperties = $properties->get();
    
        $propertiesWithImages = Property::with('images')->get();
        $filteredPropertiesArray = $filteredProperties->toArray();

// Log the filtered properties
Log::info('Filtered Properties:', $filteredPropertiesArray);

        // return Inertia::render('Darek/Home', [
        //     'propertiesWithImages' => $propertiesWithImages,
        //     'filteredProperties' => $filteredProperties,
        // ]);
        // return response()->json($filteredProperties);
        
        //     return Inertia::render('Darek/SearchInfo', [
        //     'filteredProperties' => $filteredProperties,
        // ]);
    }
    



    
        
        // return json_decode($filteredProperties);
        // return response()->json($filteredProperties);
        // return Inertia::location(route('DarekSearchInfo', [
        //     'filteredProperties' => $filteredProperties,
        // ]));
        // return Inertia::share('filteredProperties', $filteredProperties);
        public function addMessage(Request $request)
        {
            $message = new Message();
            $message->fill($request->all());
            
            $message->save();

            Log::info('Message values:', $message->toArray());
            
            return response()->json(['message' => 'Message added successfully', 'value' => $message], 201);
        }
        public function getMessage(Request $request){

            $conversationIds = Message::distinct()
            ->select('conversation_id')
            ->get()
            ->pluck('conversation_id');
            $idConv = 3;
            $data = '';

            Log::info('Request: ' . json_encode($request->all()));

            $data = $request->get('IdConvers');
            if(isset($data)){
            $idConv = $data;
            };

            Log::info('Conversation ID: ' . $idConv .' || '. $data);
            // Log::info('Conversation_DATA: ' . $data);

            $messages = Message::where('conversation_id', $idConv)->get();
        

            return Inertia::render('Darek/AppMessage', ["conversation_id"=> $conversationIds,
            'messages' => $messages
    ]);
            
            // return response()->json(['messages' => $messages], 200);

        }
        // public function getAllMessage(Request $request) {
        //     // Log the entire request
        //     Log::info('Request: ' . json_encode($request->all()));
        
        //     // Retrieve the conversation ID from the request
        //     // $idConv = $request->get('IdConvers');
        //     $idConv = 2;
        
        //     // Log the conversation ID
        //     Log::info('Conversation ID: ' . $idConv);
        
        //     // Retrieve messages for the given conversation ID
        //     $messages = Message::where('conversation_id', $idConv)->get();
        
        //     // Render the Inertia view with the messages
        //     return Inertia::render('Darek/AppMessage', ['messages' => $messages]);
        // }
        
        


}
