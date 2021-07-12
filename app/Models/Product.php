<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'NomeProdotto',
        'Descrizione',
        'Prezzo',
        'PercorsoImg',
        'PrezzoScontato',
        'Sconto'
    ];

    public function users(){
        return $this->belogsTo("App\models\User");
    }

}
?>