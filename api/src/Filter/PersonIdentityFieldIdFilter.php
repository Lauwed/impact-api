<?php

namespace App\Filter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;

class PersonIdentityFieldIdFilter extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        if ($property !== 'ids') {
            return;
        }

        // If no value is provided, return
        if (null === $value || '' === $value) {
            return;
        }

        // Split the comma-separated string into an array
        $idsArray = explode(',', $value);

        // Ensure the array contains valid IDs
        $idsArray = array_filter($idsArray, 'is_numeric');

        // If the array is empty after filtering, return without applying any filter
        if (empty($idsArray)) {
            return;
        }

        // Apply the filter based on the array of IDs
        $alias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere($alias . '.id IN (:ids)')
                     ->setParameter('ids', $idsArray);
    }

    public function getDescription(string $resourceClass): array
    {
        return [
            'ids' => [
                'property' => 'id',
                'type' => Type::BUILTIN_TYPE_STRING,
                'required' => false, // Optional filter
                'description' => 'Filter PersonIdentityFields by a comma-separated list of IDs',
            ],
        ];
    }
}
