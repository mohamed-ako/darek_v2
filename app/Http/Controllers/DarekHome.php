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
        $propertiesWithImages = Property::with('images')->get();

        return Inertia::render('Darek/Home', [
            'propertiesWithImages' => $propertiesWithImages,
        ]);
    }
    public function search(Request $request){
        Session::put('querySearch', $request->get('query'));
        Session::put('citySearch', $request->get('city'));
        Session::put('typeSearch', $request->get('type'));
        Session::put('priceSearch', $request->get('price'));

        // $query = $request->get('query');
        // $city = $request->get('city');
        // $type = $request->get('type');
        // $price = $request->get('price');
        return redirect()->route('DarekSearchInfo'); // Adjust the route name as needed
    
    }

    public function searchData(Request $request)
    {
        // $query = $request->get('query');
        // $city = $request->get('city');
        // $type = $request->get('type');
        // $price = $request->get('price');

        $query = Session::get('querySearch');
        $city = Session::get('citySearch');
        $type = Session::get('typeSearch');
        $price = Session::get('priceSearch');
    
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
        
            return Inertia::render('Darek/SearchInfo', [
            'filteredProperties' => $filteredProperties,
        ]);
    }
    


    
        
        // return json_decode($filteredProperties);
        // return response()->json($filteredProperties);
        // return Inertia::location(route('DarekSearchInfo', [
        //     'filteredProperties' => $filteredProperties,
        // ]));
        // return Inertia::share('filteredProperties', $filteredProperties);
        public function addMessage(Request $request)
        {
            $adminEmail='';
 
            $adminEmail = Session::get('controlleremail');
            $message = new Message();
            $message->fill($request->all());
            $message->save();

            
            Log::info('Message values:', $message->toArray());
            return redirect()->route('MyMessages'); // Adjust the route name as needed
            
            // return response()->json(['message' => 'Message added successfully', 'value' => $message,'adminEmail'=>$adminEmail], 201)->header('X-Inertia-Reload', 'true');;
        }

            public function getMessage(Request $request){

                $adminUserId = Session::get('adminUserId');

                $conversationIds = Message::where('sender_id', $adminUserId)
                    ->orWhere('receiver_id', $adminUserId)
                    ->distinct()
                    ->pluck('conversation_id');
                
                $conversations = Message::whereIn('conversation_id', $conversationIds)
                    ->select('sender_id', 'receiver_id', 'conversation_id')
                    ->get();
                
                $senderDetails = User::whereIn('id', $conversations->pluck('sender_id'))->select('id', 'first_name', 'last_name')->get();
                
                $receiverDetails = User::whereIn('id', $conversations->pluck('receiver_id'))->select('id', 'first_name', 'last_name')->get();
                
                $users = $senderDetails->merge($receiverDetails);
                Session::put('users', $users);

                
                $IdConvers = $request->get('IdConvers', 3); // Default to conversation ID 3 if not provided
                $messages = Message::where('conversation_id', $IdConvers)->get();
            
                $adminEmail = Session::get('controlleremail');
            
                return Inertia::render('Darek/AppMessage', [
                    "conversations"=> $conversations,
                    'conversationIds'=> $conversationIds,
                    'users' => $users,
                    // 'messages' => $messages,
                    'adminEmail' => $adminEmail,
                    'adminUserId' => $adminUserId,
                    'IdConvers' => $IdConvers

                ]);
            }
            
    //         Log::info('Request: ' . json_encode($request->all()));

    //         $data = $request->get('IdConvers');
    //         if(isset($data)){
    //         $idConv = $data;
    //         };

    //         Log::info('Conversation ID: ' . $idConv .' || '. $data);
    //         // Log::info('Conversation_DATA: ' . $data);

    //         $messages = Message::where('conversation_id', $idConv)->get();
        

    //         return Inertia::render('Darek/AppMessage', [
    //         "conversations"=> $conversations,
    //         'users' => $users,
    //         'messages' => $messages,
    //         'adminEmail' => $adminEmail
    // ]);
            
    //         // return response()->json(['messages' => $messages], 200);

    //     }
        public function getAllMessage(Request $request) {
            Session::put('IdConvers', $request->get('IdConvers'));
            return redirect()->route('MyMessages'); // Adjust the route name as needed

        }

        public function MessagesList(Request $request) {
            // Log the entire request

            Log::info('Request: of id convers' . json_encode($request->all()));
        
            // Retrieve the conversation ID from the request
            // $IdConvers = $request->get('IdConvers');
            // $idConv = 2;
            $IdConvers = Session::get('IdConvers');
        
            // Log the conversation ID
        
            // $idConv = $request->get('IdConvers', 3); // Default to conversation ID 3 if not provided
            $messages = Message::where('conversation_id', $IdConvers)->get();
            Log::info('Conversation ID in MessagesList : ' . $IdConvers);
        
            // Render the Inertia view with the messages
            // return json_decode($messages);
            return Inertia::render('Darek/MyMessages', ['messagesData' => $messages,
            'IdConvers' => $IdConvers,
            'users' => Session::get('users'),
            'IdAdmin'=>Session::get('adminUserId')
        ]);
            // return Inertia::render('Darek/MyMessages', ['messagesData' => $messages,'IdConvers' => $IdConvers]);
        }
        public function info(Request $request)

{
    // $id = $request->input('id');
    $id = $request->get('id');


    $idUser = User::where('id', $id)->get();

    // Retrieve the parameters from the request
    $city = $request->input('city');
    $type = $request->input('type');

    // Check if the parameters are being received correctly
    // Log or dump them for debugging purposes
    // This will help you verify if the parameters are being sent from the frontend
    Log::info('ID: ' . $id);
    Log::info('City: ' . $city);
    Log::info('Type: ' . $type);

    // Now you can use these parameters as needed

    // For example, you can pass them to a view
    // return response()->json($idUser);

    return view("/info-page", compact('id', 'city', 'type'));
}
        
        


}
