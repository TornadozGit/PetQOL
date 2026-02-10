<section id="pets" class="section">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="display-2 mb-1">My Pets</h2>
            <p class="text-muted">Manage your pet family</p>
        </div>
        <button class="btn btn-primary" onclick="app.showAddPetModal()">
            <i class="bi bi-plus-lg me-2"></i> Add Pet
        </button>
    </div>

    <div id="pets-grid" class="row g-4">
        <!-- Filled by JavaScript -->
    </div>
</section>