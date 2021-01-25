<?php

namespace App\Controller;

use App\Repository\ProduitRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Produit;


/**
 * @Route("/api/produit", name="api_produit")
 */
class ProduitController extends AbstractController
{
    private $entityManager;
    private $produitRepository;
    private $projectDir;

    public function __construct(EntityManagerInterface $entityManager, ProduitRepository $produitRepository, string $projectDir) {
        $this->entityManager = $entityManager;
        $this->produitRepository = $produitRepository;
        $this->projectDir = $projectDir;
    }
    /**
     * @Route("/read", name="api_ produit_read")
     */
    public function index(): Response
    {
        $produits = $this->produitRepository->findAll();
        $arrayofProduit = [];

        foreach ($produits as $produit) {
            $arrayofProduit[] = $produit->toArray();
        }

        return $this->json( $arrayofProduit);
    }


    /**
     * @Route("/create", name="api_produit_create")
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request, Filesystem $fs)
    {
        $content = json_decode($request->getContent());
        dump($content);
        $produit = new Produit();

        $produit->setNom($content->newnom);
        $produit->setLocalisation($content->newlocal);
        $produit->setDescription($content->newdesc);
        $produit->setPrix($content->newprix);
        //controller pour l'ajout d'un image
        if ($content->newimg && $content->filename) {
            $filename = $content->filename;
             if ($fs->exists($this->projectDir."/public/".$produit::IMAGE_PATH)) $fs->mkdir($this->projectDir."/public/".$produit::IMAGE_PATH, 0777);
            $type = ['jpg','png','JPG','jpeg'];

            for ($i = 0; $i < count($type); $i++) {
                if($type){
                    file_put_contents($this->projectDir."/public/".$produit::IMAGE_PATH.$filename, base64_decode(str_replace('data:image/'.$type[$i].';'.'base64,', '', $content->newimg)));
                }
            }
            $produit->setImage($filename);
            dump('eto 2');
        } else {
            $produit->setImage($produit::DEFAULT_IMAGE);
        }

        try {
            $this->entityManager->persist($produit);
            dump('Ato');
            $this->entityManager->flush();
            dump('Aty');
            return $this->json([
                'produit' => $produit->toArray(),
            ]);
        } catch (Exception $exception){
            return $this->json([
                //error
            ]);
        }
    }
}
