<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\FavoriteProperty;
use App\Models\User;

class DarekProfile extends Controller
{
    public function home(Request $request)
    {
        // $myemail = $request->query('email');
        $myemail = Session::get('controlleremail');
        // $myemail = $request->get('query');
        // $myemail = $request->input('email');   
        // $myemail = Session::get('email');

        \Log::info('DarekProfile email :', ['email' => $myemail]);   
        
        
        $myProperty = [];
        $msg = '';
        $firstUser = '';
        $myTableData = '';
        $myfvpr = [];
        $images = [];
        $myoffers = '';
        $myuserID='';

        $firstUser = User::where('email', $myemail)->first();
        
        if ($firstUser) {
            $myuserID = $firstUser->id;
            
            // Retrieve offers of the user
            $myoffers = Property::where('user_id', $myuserID)->get();

            // Retrieve favorite properties of the user
            $myTableData = FavoriteProperty::where('user_id', $myuserID)->get();
            \Log::info('Favorite Properties:', $myTableData->toArray());

            // If favorite properties exist, fetch property details and images
            if ($myTableData->isNotEmpty()) {
                foreach ($myTableData as $data) {
                    $myProperty = Property::find($data->property_id);
                    if ($myProperty) {
                        $myfvpr[$data->property_id] = $myProperty;
                        
                        $myImages = PropertyImage::where('property_id', $data->property_id)->get();
                        if ($myImages->isNotEmpty()) {
                            $images[$data->property_id] = $myImages;
                        }
                    }
                }
            }
            
            $msg = 'Successfully connected to the database. Database name is ' . DB::connection()->getDatabaseName();
        } else {
            $msg = 'Unable to find user with email: ' . $myemail;
        }

        return Inertia::render('Darek/Profile', [
            'message' => $msg,
            'myusers' => $firstUser,
            'mydata' => $myTableData,
            'myproperty' => $myProperty,
            'myfvpr' => $myfvpr,
            'images' => $images,
            'myoffers' => $myoffers,
        ]);
    }

    public function get(Request $request)
    {
        $email = $request->input('email');
        $text = 'hello, I am text';
        return Inertia::render('Darek/get', [
            'email' => $email,
            'text' => $text
        ]);
    }

    public function update(Request $request)
    {
        Log::info('Update request:', $request->all());
    
        $user = User::find($request->user_id);
    
        if (!$user) {
            return Inertia::render('Darek/Profile',['error' => 'User not found'], 404);
        }
        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'username' => $request->user_name,
            'phone' => $request->phone, // Uncomment if you want to update phone as well
        ]);

        return response()->json([
            'success' => 'User updated successfully',
            'user' => $user, // Include the updated user data in the response
        ]);

        // return response()->json(['updaet_message' => 'User updated successfully','status' => 'success' ,'first_name' => $request->first_name,
        //     'last_name' => $request->last_name,
        //     'email' => $request->email,
        //     'username' => $request->user_name,
        //     'phone' => $request->phone,
        //     ]);
            // return Inertia::render('Darek/Profile', ['success' => 'User updated successfully','status' => 'success' ,'first_name' => $request->first_name,
            //     'last_name' => $request->last_name,
            //     'email' => $request->email,
            //     'username' => $request->user_name,
            //     'phone' => $request->phone,
            // ]);
            // return redirect()->route('myprofile')->with('success', 'User updated successfully');

        }

      // Add new method to delete favorite properties
public function deleteFavoriteProperty(Request $request)
{
    $id = $request->input('id');

    // Delete from favoriteproperty table
    FavoriteProperty::where('property_id', $id)->delete();

    return Inertia::render('Darek/Profile',['success' => 'Favorite property deleted successfully']);
}

public function deleteOffer(Request $request)
{
    $id = $request->input('id');

    FavoriteProperty::where('property_id', $id)->delete();

    $offer = Property::find($id);
    if ($offer) {
        $offer->delete();
        
        return Inertia::render('Darek/Profile',['success' => 'Offer deleted successfully']);
    } else {
        return Inertia::render('Darek/Profile',['error' => 'Offer not found'], 404);
    }
}


// Adjust the delete method to call the appropriate method based on the type
// public function delete(Request $request)
// {
//     $type = $request->input('type'); // 'property' or 'offer'
//     $id = $request->input('id'); // ID of the property or offer to delete

//     if ($type === 'property') {
//         // Delete related records from the favoriteproperty table
//         FavoriteProperty::where('property_id', $id)->delete();

//         // Now delete the property record
//         $property = Property::find($id);
//         if ($property) {
//             $property->delete();
//             return Inertia::render('Darek/get',['success' => 'Property deleted successfully']);
//         } else {
//             return Inertia::render('Darek/get',['error' => 'Property not found'], 404);
//         }
//     } elseif ($type === 'offer') {
//         // Delete the offer record
//         $offer = Offer::find($id);
//         if ($offer) {
//             $offer->delete();
//             return response()->json(['message' => 'Offer deleted successfully']);
//         } else {
//             return Inertia::render('Darek/get',['error' => 'Offer not found'], 404);
//         }
//     } else {
//         return Inertia::render('Darek/get',['error' => 'Invalid type provided'], 400);
//     }
// }

public function updateProfilePicture(Request $request)
{
    try {
        // Check if the user is authenticated
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Validate the request data
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max file size as needed
        ]);

        // Get the authenticated user
        $user = auth()->user();

        // Handle the uploaded file
        if ($request->hasFile('profile_picture')) {
            // Retrieve the profile picture from the request
            $profilePicture = $request->file('profile_picture');

            // Generate a unique file name
            $fileName = time() . '_' . $profilePicture->getClientOriginalName();

            // Store the profile picture in the public disk under the 'profile_pictures' directory
            $filePath = $profilePicture->storeAs('profile_pictures', $fileName, 'public');

            // Update the user's profile picture path in the database
            $user->profile_picture = $filePath;
            $user->save();

            return response()->json(['message' => 'Profile picture updated successfully']);
        } else {
            // Return an error response if no profile picture is uploaded
            return response()->json(['error' => 'No profile picture uploaded'], 400);
        }
    } catch (\Exception $e) {
        // Log any errors that occur during the process
        \Log::error('Error updating profile picture: ' . $e->getMessage());

        // Return a server error response if an exception is thrown
        return response()->json(['error' => 'Failed to update profile picture'], 500);
    }
}



};