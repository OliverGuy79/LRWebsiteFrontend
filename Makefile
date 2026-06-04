.PHONY: help

# Default target
help:
	@echo "LaRencontre Website - Commands"
	@echo ""
	@echo "=== Frontend (LRWebsiteFrontend) ==="
	@echo "  make install   Install frontend dependencies"
	@echo "  make dev       Start frontend dev server (port 5173)"
	@echo "  make build     Build frontend for production"
	@echo "  make preview   Preview production build"
	@echo ""

# === Frontend ===
install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview
