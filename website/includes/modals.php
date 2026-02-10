<!-- === MODALS === -->
<div class="modal fade" id="addPetModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Add New Pet</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">
                <form id="add-pet-form">
                    <div class="mb-3"><label class="form-label">Pet Name</label><input type="text" class="form-control" id="pet-name" required></div>
                    <div class="row g-3">
                        <div class="col-md-6"><label class="form-label">Type</label><select class="form-select" id="pet-type"><option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option><option>Fish</option><option>Other</option></select></div>
                        <div class="col-md-6"><label class="form-label">Breed</label><input type="text" class="form-control" id="pet-breed"></div>
                    </div>
                    <div class="row g-3 mt-3">
                        <div class="col-md-6"><label class="form-label">Age</label><input type="text" class="form-control" id="pet-age" placeholder="e.g., 3 years"></div>
                        <div class="col-md-6"><label class="form-label">Weight</label><input type="text" class="form-control" id="pet-weight" placeholder="e.g., 15 kg"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer"><button type="button" class="btn btn-outline" data-bs-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary" onclick="app.savePet()">Add Pet</button></div>
        </div>
    </div>
</div>

<!-- === TOASTS === -->
<div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 2000;">
    <div id="successToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header"><i class="bi bi-check-circle-fill text-success me-2"></i><strong class="me-auto">Success</strong><button type="button" class="btn-close" data-bs-dismiss="toast"></button></div>
        <div class="toast-body" id="toast-message"></div>
    </div>
</div>