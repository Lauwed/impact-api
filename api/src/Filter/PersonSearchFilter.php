<?php

namespace App\Filter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;

class PersonSearchFilter extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if ($property !== 'q') {
            return;
        }

        // Apply search to both 'name' and 'maidenName' fields
        $alias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('LOWER(%s.name) LIKE LOWER(:search) OR LOWER(%s.romanizedName) LIKE LOWER(:search)', $alias, $alias))
                     ->setParameter('search', '%' . strtolower($value) . '%');
    }

    public function getDescription(string $resourceClass): array
    {
        return [
            'q' => [
                'property' => null,
                'type' => Type::BUILTIN_TYPE_STRING,
                'required' => false,
                'description' => 'Search by name or maiden name',
            ],
        ];
    }
}
