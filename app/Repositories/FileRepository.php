<?php

namespace Indiemesh\Repositories;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\File;

class FileRepository implements Repository
{
    public function save(File $file, $fileName, $directory = null)
    {
        return Storage::disk('public_uploads')->putFileAs($directory, $file, $fileName);
    }

    public function getFile($relPath)
    {
        $exists = Storage::disk('public_uploads')->exists($relPath);

        if($exists){
            return Storage::disk('public_uploads')->get($relPath);
        }

        return null;
    }

    public function deleteFile($relPath)
    {
        return Storage::disk('public_uploads')->delete($relPath);
    }
}
