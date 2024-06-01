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

    $validated = $request->validate([
        'sender_id' => 'required|integer',
        'receiver_id' => 'required|integer',
        'message' => 'required|string',
    ]);

    // Create a new Message instance
    $message = new Message();
    $message->sender_id = $validated['sender_id'];
    $message->receiver_id = $validated['receiver_id'];
    $message->message = $validated['message'];

    // Save the message
    $message->save();

    // Log the saved message
    Log::info('Message values:', $message->toArray());

    // Redirect to the MyMessages route
    return redirect()->route('MyMessages'); // Adjust the route name as needed


            // $message->fill($request->all());
            // $message->save();

            
            // Log::info('Message values:', $message->toArray());
            // return redirect()->route('MyMessages');
            
            // Adjust the route name as needed
            
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

                
                $IdConvers = $request->get('IdConvers'); // Default to conversation ID 3 if not provided
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

        public function getAllMessage(Request $request) {
            Session::put('IdConvers', $request->get('IdConvers'));
            return redirect()->route('MyMessages');

        }

        public function MessagesList(Request $request) {
            // Log the entire request

            Log::info('Request: of id convers' . json_encode($request->all()));
        
           
            $IdConvers = Session::get('IdConvers');
        
        
            $messages = Message::where('conversation_id', $IdConvers)->get();
            Log::info('Conversation ID in MessagesList : ' . $IdConvers);
        
            return Inertia::render('Darek/MyMessages', ['messagesData' => $messages,
            'IdConvers' => $IdConvers,
            'users' => Session::get('users'),
            'IdAdmin'=>Session::get('adminUserId')
        ]);
        }
        public function sendMessage(Request $request) {
            Session::put('receiver_id', $request->get('receiver_id'));

    
        $validated = $request->validate([
            'sender_id' => 'required|integer',
            'receiver_id' => 'required|integer',
            'message' => 'required|string',
        ]);
 
        $message = new Message();
        $message->sender_id = $validated['sender_id'];
        $message->receiver_id = $validated['receiver_id'];
        $message->message = $validated['message'];
    
        $message->save();
    
        Log::info('Message values:', $message->toArray());


        return redirect()->route('getmyMessage');  
    // return redirect()->route('InfoPrperty', ['id' => $id]);


        }
        public function getmyMessage(Request $request)
        {

            $receiver_id = Session::get('receiver_id');
            $adminUserId = Session::get('adminUserId');
            Log::info('Receiver ID: ' . $receiver_id);
        
            Log::info('Admin ID: ' . $adminUserId);
        
            $conversationIds = Message::where(function ($query) use ($receiver_id, $adminUserId) {
                    $query->where('sender_id', $receiver_id)
                        ->orWhere('receiver_id', $receiver_id);
                })
                ->where(function ($query) use ($receiver_id, $adminUserId) {
                    $query->where('sender_id', $adminUserId)
                        ->orWhere('receiver_id', $adminUserId);
                })
                ->distinct()
                ->pluck('conversation_id');
        
            // Fetch messages in this conversation
            $messages = Message::whereIn('conversation_id', $conversationIds)->get();
        
            // Fetch sender and receiver details
            $senderDetails = User::whereIn('id', function ($query) use ($conversationIds) {
                    $query->select('sender_id')
                        ->from('messages')
                        ->whereIn('conversation_id', $conversationIds);
                })->select('id', 'first_name', 'last_name')->get();
        
            $receiverDetails = User::whereIn('id', function ($query) use ($conversationIds) {
                    $query->select('receiver_id')
                        ->from('messages')
                        ->whereIn('conversation_id', $conversationIds);
                })->select('id', 'first_name', 'last_name')->get();
        
            $users = $senderDetails->merge($receiverDetails);
        
            // Use the first conversation ID as IdConvers
            $IdConvers = $conversationIds->first();
        
            return Inertia::render('Darek/MyMessages', [
                'messagesData' => $messages,
                'IdConvers' => $IdConvers,
                'users' => $users,
                'IdAdmin' => $adminUserId,
            ]);
        }
        


        public function info(Request $request)

{
    
    $id = $request->get('id');
    
    return redirect()->route('InfoPrperty', ['id' => $id]);

}
public function InfoPrperty(Request $request, $id)
{
    $Property = Property::where('property_id', $id)->first();
    $PropertyImage = PropertyImage::where('property_id', $id)->get();

    $user_id = $Property->user_id;
    
    $User = User::where('id',$user_id )->first();

    return Inertia::render("Darek/InfoPrperty", ['User'=>$User,'Property'=>$Property ,'PropertyImage'=>$PropertyImage,'IdAdmin'=>Session::get('adminUserId')]);
   }     
        


}
