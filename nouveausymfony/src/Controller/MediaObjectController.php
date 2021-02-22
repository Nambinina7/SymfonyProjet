<?php

namespace App\Controller;

use App\Entity\MediaObject;
use App\Form\MediaObjectType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/media/object")
 */
class MediaObjectController extends AbstractController
{
    /**
     * @Route("/", name="media_object_index", methods={"GET"})
     */
    public function index(): Response
    {
        $mediaObjects = $this->getDoctrine()
            ->getRepository(MediaObject::class)
            ->findAll();

        return $this->render('media_object/index.html.twig', [
            'media_objects' => $mediaObjects,
        ]);
    }

    /**
     * @Route("/new", name="media_object_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $mediaObject = new MediaObject();
        $form = $this->createForm(MediaObjectType::class, $mediaObject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($mediaObject);
            $entityManager->flush();

            return $this->redirectToRoute('media_object_index');
        }

        return $this->render('media_object/new.html.twig', [
            'media_object' => $mediaObject,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="media_object_show", methods={"GET"})
     */
    public function show(MediaObject $mediaObject): Response
    {
        return $this->render('media_object/show.html.twig', [
            'media_object' => $mediaObject,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="media_object_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, MediaObject $mediaObject): Response
    {
        $form = $this->createForm(MediaObjectType::class, $mediaObject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('media_object_index');
        }

        return $this->render('media_object/edit.html.twig', [
            'media_object' => $mediaObject,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="media_object_delete", methods={"DELETE"})
     */
    public function delete(Request $request, MediaObject $mediaObject): Response
    {
        if ($this->isCsrfTokenValid('delete'.$mediaObject->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($mediaObject);
            $entityManager->flush();
        }

        return $this->redirectToRoute('media_object_index');
    }
}
