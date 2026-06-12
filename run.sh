#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 LA VERTICALE - Démarrage du serveur${NC}"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Créé de .env depuis .env.example${NC}"
    cp .env.example .env
    echo -e "${RED}❌ Veuillez configurer .env avec vos variables${NC}"
    exit 1
fi

# Check if venv exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}📦 Création de l'environnement virtuel${NC}"
    python3 -m venv venv
fi

# Activate venv
echo -e "${YELLOW}🔌 Activation de l'environnement virtuel${NC}"
source venv/bin/activate

# Install dependencies
echo -e "${YELLOW}📚 Installation des dépendances${NC}"
pip install -r requirements.txt

# Initialize database
echo -e "${YELLOW}🗄️  Initialisation de la base de données${NC}"
python -c "from app import db, app; db.create_all()"

# Start server
echo -e "${GREEN}✅ Serveur prêt!${NC}"
echo -e "${GREEN}🌐 http://localhost:5000${NC}"
echo -e "${GREEN}📡 API: http://localhost:5000/api${NC}"
echo -e "${GREEN}💬 ChatBot: Disponible sur la page${NC}"
echo ""

python app.py