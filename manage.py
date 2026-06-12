#!/usr/bin/env python
import os
import click
from app import app, db
from flask.cli import with_appcontext

@click.group()
def cli():
    """Outils de gestion LA VERTICALE"""
    pass

@cli.command()
@with_appcontext
def init_db():
    """Initialiser la base de données"""
    click.echo('🗄️  Initialisation de la base de données...')
    db.create_all()
    click.echo('✅ Base de données initialisée!')

@cli.command()
@with_appcontext
def reset_db():
    """Réinitialiser la base de données (ATTENTION: supprime tout!)"""
    if click.confirm('⚠️  Êtes-vous sûr? Cela supprimera TOUTES les données.'):
        click.echo('🗑️  Suppression de la base de données...')
        db.drop_all()
        click.echo('✅ Base de données supprimée!')
        click.echo('🗄️  Création de nouvelles tables...')
        db.create_all()
        click.echo('✅ Nouvelle base de données créée!')

@cli.command()
@with_appcontext
def create_admin():
    """Créer un utilisateur administrateur (futur)"""
    click.echo('👤 Création d\'un administrateur...')
    # À implémenter
    click.echo('✅ Administrateur créé!')

@cli.command()
@with_appcontext
def export_analytics():
    """Exporter les données analytics en CSV"""
    from app import PageView, UserEvent
    import csv
    from datetime import datetime
    
    click.echo('📊 Export des analytics...')
    
    filename = f"analytics_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    
    pageviews = PageView.query.all()
    events = UserEvent.query.all()
    
    with open(filename, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Type', 'User ID', 'Data', 'Timestamp'])
        
        for pv in pageviews:
            writer.writerow(['pageview', pv.user_id, pv.page_path, pv.timestamp])
        
        for ev in events:
            writer.writerow(['event', ev.user_id, ev.event_type, ev.timestamp])
    
    click.echo(f'✅ Données exportées dans {filename}')

@cli.command()
@with_appcontext
def backup_db():
    """Sauvegarder la base de données"""
    import shutil
    from datetime import datetime
    
    click.echo('💾 Sauvegarde de la base de données...')
    
    db_file = 'laverticale.db'
    backup_file = f"backups/laverticale_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.db"
    
    os.makedirs('backups', exist_ok=True)
    shutil.copy(db_file, backup_file)
    
    click.echo(f'✅ Sauvegarde créée: {backup_file}')

if __name__ == '__main__':
    cli()