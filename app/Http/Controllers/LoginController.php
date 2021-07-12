<?php
namespace app\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class LoginController extends BaseController
{
    public function login(){
        //verifico se l'utente o un admin ha già fatto il login
        if(session('user_id')==null && session('admin_id')==null){
            //errore nel login
            return view('login')
                ->with('csrf_token',csrf_token());
        }else{
           return redirect('home');
       } 
    
    }

public function checkLogin(){
    if(request('checkbox')=="admin"){
        $admin = Admin::where('email',request('email'))->first(); 
        if(isset($admin) && Hash::check(request('password'),$admin->password)){
            //credenziali valide
            Session::put('admin_id',$admin->id);
            return view('home')
                ->with('nome',$admin->email);
        }else{
            return view('login')
                ->with('csrf_token',csrf_token());
        }
    }else{
        $user = User::where('email',request('email'))->first();
        if(isset($user) && Hash::check(request('password'),$user->password)){
            //credenziali valide
            Session::put('user_id',$user->id);
            return view('home')
                ->with('nome',$user->email);
        }else{
            return view('login')
                ->with('csrf_token',csrf_token());
        }  
    }
}

public function logout(){
    //eliminiamo i dati di sessione
    Session::flush();
    //torniamo al login
    return redirect('login');
} 
   
    
}
?>
