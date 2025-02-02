<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240915143303 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE achievement_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE achievement (id INT NOT NULL, person_id INT NOT NULL, source_id INT NOT NULL, content TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_96737FF1217BBB47 ON achievement (person_id)');
        $this->addSql('CREATE INDEX IDX_96737FF1953C1C61 ON achievement (source_id)');
        $this->addSql('ALTER TABLE achievement ADD CONSTRAINT FK_96737FF1217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE achievement ADD CONSTRAINT FK_96737FF1953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE achievement_id_seq CASCADE');
        $this->addSql('ALTER TABLE achievement DROP CONSTRAINT FK_96737FF1217BBB47');
        $this->addSql('ALTER TABLE achievement DROP CONSTRAINT FK_96737FF1953C1C61');
        $this->addSql('DROP TABLE achievement');
    }
}
