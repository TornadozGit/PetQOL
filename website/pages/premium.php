<section id="premium" class="section">
    <div class="text-center mb-5">
        <h2 class="display-2 mb-1">Unlock Premium</h2>
        <p class="text-muted">Upgrade your pet's care with advanced insights & unlimited features</p>
    </div>

    <div class="row g-4 justify-content-center align-items-stretch">
        
        <!-- FREE PLAN -->
        <div class="col-md-6 col-lg-5">
            <div class="card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                    <div class="mb-4">
                        <span class="badge bg-secondary-subtle text-secondary-emphasis mb-2">Current Plan</span>
                        <h3 class="h4 fw-bold">Free Starter</h3>
                        <div class="display-2 fw-bold my-3">$0</div>
                        <p class="text-muted">Perfect for trying out PetQOL basics.</p>
                    </div>
                    
                    <ul class="list-unstyled mb-4">
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                            <span>Track up to 1 Pet</span>
                        </li>
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                            <span>Daily Basic Check-ins</span>
                        </li>
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                            <span>7-Day History View</span>
                        </li>
                        <li class="mb-3 d-flex align-items-center text-muted opacity-50">
                            <i class="bi bi-x-circle-fill text-muted me-3 fs-5"></i>
                            <span>Advanced Health Insights</span>
                        </li>
                        <li class="mb-3 d-flex align-items-center text-muted opacity-50">
                            <i class="bi bi-x-circle-fill text-muted me-3 fs-5"></i>
                            <span>Export Data (CSV/PDF)</span>
                        </li>
                    </ul>
                </div>
                
                <button class="btn btn-outline w-100" disabled>
                    Current Plan
                </button>
            </div>
        </div>

        <!-- PREMIUM PLAN -->
        <div class="col-md-6 col-lg-5">
            <div class="card p-4 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden border-primary border-2" style="box-shadow: 0 15px 40px rgba(79, 70, 229, 0.15); background: rgba(255, 255, 255, 0.75);">
                
                <!-- Popular Badge -->
                <div class="position-absolute top-0 end-0 m-0">
                    <span class="badge bg-primary text-white rounded-bottom-start-4 px-3 py-2 shadow-sm">
                        Most Popular
                    </span>
                </div>

                <div>
                    <div class="mb-4">
                        <h3 class="h4 fw-bold text-primary">Premium Pro</h3>
                        <div class="d-flex align-items-baseline gap-1 my-3">
                            <span class="display-2 fw-bold text-gradient">$19.99</span>
                            <span class="text-muted">/month</span>
                        </div>
                        <p class="text-muted">Everything you need to ensure optimal wellness.</p>
                    </div>
                    
                    <ul class="list-unstyled mb-4">
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-check-circle-fill text-primary me-3 fs-5"></i>
                            <span><strong>Unlimited</strong> Pets Profile</span>
                        </li>
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-check-circle-fill text-primary me-3 fs-5"></i>
                            <span>Advanced Mood & Signal Analytics</span>
                        </li>
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-check-circle-fill text-primary me-3 fs-5"></i>
                            <span>Unlimited History Storage</span>
                        </li>
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-check-circle-fill text-primary me-3 fs-5"></i>
                            <span>Export Full Health Reports</span>
                        </li>
                        <li class="mb-3 d-flex align-items-center">
                            <i class="bi bi-check-circle-fill text-primary me-3 fs-5"></i>
                            <span>Priority Customer Support</span>
                        </li>
                    </ul>
                </div>
                
                <button class="btn btn-primary w-100 btn-lg" onclick="app.showToast('Redirecting to payment gateway...')">
                    Start 7-Day Free Trial
                </button>
            </div>
        </div>

    </div>

    <!-- Trust Signals -->
    <div class="text-center mt-5 pt-4">
        <p class="text-muted small mb-3">Secure payment processed by Stripe • Cancel anytime • 30-day money back guarantee</p>
        <div class="d-flex justify-content-center gap-3 opacity-50 grayscale">
            <i class="bi bi-credit-card-2-front fs-3"></i>
            <i class="bi bi-shield-check fs-3"></i>
            <i class="bi bi-lock-fill fs-3"></i>
        </div>
    </div>
</section>