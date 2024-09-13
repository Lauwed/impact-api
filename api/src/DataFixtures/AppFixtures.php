<?php

namespace App\DataFixtures;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager)
    {
        $user = $manager->getRepository(User::class)->findOneBy(['username' => 'admin']);
        if (!$user) {
            return;
        }

        $newUser = new User();
        $newUser->setUsername('admin');

        $password = $this->hasher->hashPassword($newUser, 'admin');
        $newUser->setPassword($password);

        $manager->persist($newUser);
        $manager->flush();
    }
}