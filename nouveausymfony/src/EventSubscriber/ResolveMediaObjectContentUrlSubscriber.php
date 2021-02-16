<?php
// api/src/EventSubscriber/ResolveMediaObjectContentUrlSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use App\Entity\MediaObject;
use App\Entity\Produit;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Vich\UploaderBundle\Storage\StorageInterface;

final class ResolveMediaObjectContentUrlSubscriber implements EventSubscriberInterface
{
    private $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE],
        ];
    }

    public function onPreSerialize(ViewEvent $event): void
    {
        $controllerResult = $event->getControllerResult();
        $request = $event->getRequest();

//        if ($controllerResult instanceof Response || !$request->attributes->getBoolean('_api_respond', true)) {
//            dump("ato"); die;
//            return;
//        }

//        if (
//            !($attributes = RequestAttributesExtractor::extractAttributes($request)) ||
//            !\is_a($attributes['resource_class'], MediaObject::class, true) ||
//            !\is_a($attributes['resource_class'], Produit::class, true)
//        ) {
//            dump("ato1"); die;
//            return;
//        }

        $objects = $controllerResult;

        if (!is_iterable($objects)) {
            $objects = [$objects];
        }

        foreach ($objects as $object) {
            if (!$object instanceof MediaObject && !$object instanceof Produit) {
                continue;
            }

            if ($object instanceof MediaObject) {
                $object->contentUrl = $this->storage->resolveUri($object, 'file');
            }

            if ($object instanceof Produit) {
                $object->imageUrl = $this->storage->resolveUri($object->getImage(), 'file');
            }
        }
    }
}