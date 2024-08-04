<?php
namespace App\Controllers;

use App\Models\Document;

class DocumentController {
    private $document;

    public function __construct($db) {
        $this->document = new Document($db);
    }

    public function getAllDocuments() {
        return $this->document->getAllDocuments();
    }

    public function getDocumentById($id) {
        return $this->document->getDocumentById($id);
    }

    public function createDocument($title, $content) {
        return $this->document->createDocument($title, $content);
    }

    public function updateDocument($id, $title, $content) {
        return $this->document->updateDocument($id, $title, $content);
    }

    public function deleteDocument($id) {
        return $this->document->deleteDocument($id);
    }

    public function downloadDocumentAsPDF($id) {
        $document = $this->getDocumentById($id);
        if (!$document) {
            return null;
        }

        $html = "<h1>{$document['title']}</h1><div>{$document['content']}</div>";
        $pdf = new \Dompdf\Dompdf();
        $pdf->loadHtml($html);
        $pdf->render();
        return $pdf->output();
    }

    public function downloadDocumentAsXML($id) {
        $document = $this->getDocumentById($id);
        if (!$document) {
            return null;
        }

        $xml = new \SimpleXMLElement('<document/>');
        $xml->addChild('title', $document['title']);
        $xml->addChild('content', $document['content']);
        return $xml->asXML();
    }
}
?>
