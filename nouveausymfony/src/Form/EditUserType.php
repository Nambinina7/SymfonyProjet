<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class EditUserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nom',TextType::class)
            ->add('prenom', TextType::class)
            ->add('age',IntegerType::class)
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
            ->add('roles', ChoiceType::class, [
                'choices' => [
                    'utilisateur' => 'ROLE_USER',
                    'Editeur ' => 'ROLE_EDITOR',
                    'Moderateur' => 'ROLE_MODO',
                    'Administrateur' => 'ROLE_ADMIN'
                ],
                'expanded' => true,
                'multiple' => true,
                'label' => 'Rôles',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
