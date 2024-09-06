<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240906111338 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE source_media ADD image_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE source_media ADD CONSTRAINT FK_F3247A333DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F3247A333DA5256D ON source_media (image_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE source_media DROP CONSTRAINT FK_F3247A333DA5256D');
        $this->addSql('DROP INDEX IDX_F3247A333DA5256D');
        $this->addSql('ALTER TABLE source_media DROP image_id');
    }
}
