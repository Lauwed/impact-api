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
        $alias = $queryBuilder->getRootAliases()[0];

        // Check if the search query is for 'q' (name and romanizedName)
        if ($property === 'q') {
            $queryBuilder->andWhere(sprintf('LOWER(%s.name) LIKE LOWER(:search) OR LOWER(%s.romanizedName) LIKE LOWER(:search)', $alias, $alias))
                         ->setParameter('search', '%' . strtolower($value) . '%');
            return;
        }

        // Check if the search query is for 'personCategories'
        if ($property === 'personCategories') {
            $categoryAliases = [];
            $categories = array_map('trim', explode(',', strtolower($value))); // Split by comma and trim whitespace

            $personCategoryAlias = $queryNameGenerator->generateJoinAlias('personCategories');
            $categoryAlias = $queryNameGenerator->generateJoinAlias('category');
            
            $queryBuilder->leftJoin(sprintf('%s.personCategories', $alias), $personCategoryAlias)
                         ->leftJoin(sprintf('%s.category', $personCategoryAlias), $categoryAlias);
            
            $orX = $queryBuilder->expr()->orX();
            foreach ($categories as $category) {
                $param = 'category_' . uniqid();
                $categoryAliases[] = $param;
                $orX->add($queryBuilder->expr()->eq(sprintf('LOWER(%s.name)', $categoryAlias), sprintf('LOWER(:%s)', $param)));
                $queryBuilder->setParameter($param, $category);
            }
            $queryBuilder->andWhere($orX);
            return;
        }
    }

    public function getDescription(string $resourceClass): array
    {
        return [
            'q' => [
                'property' => null,
                'type' => Type::BUILTIN_TYPE_STRING,
                'required' => false,
                'description' => 'Search by name or romanized name',
            ],
            'personCategories' => [
                'property' => 'personCategories',
                'type' => Type::BUILTIN_TYPE_STRING,
                'required' => false,
                'description' => 'Filter by person categories (comma-separated category names)',
            ],
        ];
    }
}
