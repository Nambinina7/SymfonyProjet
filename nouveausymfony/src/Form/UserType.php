<?php

namespace App\Form;

use App\Entity\User;
use \Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nom', TextType::class)
            ->add('prenom', TextType::class)
            ->add('age', IntegerType::class)
            ->add('sex', ChoiceType::class, [
                'choices' => [
                    'Femme' => "Femme",
                    'Homme' => "Homme",
                ]])
            ->add('email',EmailType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Merci de saisir votre email'
                    ])
                ],
                'required' => true,
                'attr' => [
                    'class' => 'form-control'
                ]
            ])
            ->add('password',PasswordType::class)
            ->add("confirm_password",PasswordType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
