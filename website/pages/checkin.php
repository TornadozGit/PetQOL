<section id="checkin" class="section">
    <div class="checkin-stepper">
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
            <div class="text-center text-sm-start">
                <h2 class="display-2 mb-1">Daily Check-in</h2>
                <p class="text-muted">Track your pet's daily wellness</p>
            </div>
            <div class="d-flex gap-2 align-items-center">
                <span class="badge bg-primary px-3 py-2" id="checkin-step">Step 1 of 4</span>
                <button class="btn btn-icon btn-outline" onclick="app.navigate('dashboard')">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        </div>

        <!-- Progress -->
        <div class="progress mb-5" style="height: 6px;">
            <div class="progress-bar bg-primary" id="checkin-progress" style="width: 25%"></div>
        </div>

        <!-- Step 1: Mood -->
        <div id="step-1" class="checkin-step active">
            <div class="text-center mb-5">
                <h4 class="mb-2">How is <span class="text-primary" id="checkin-pet-name">your pet</span> feeling today?</h4>
                <p class="text-muted">Select mood that best matches their energy</p>
            </div>

            <div class="mood-grid">
                <div class="mood-option" onclick="checkin.setMood('thriving', 95)">
                    <span class="mood-emoji">😄</span>
                    <div class="fw-medium">Thriving</div>
                    <small class="text-muted">Very happy & energetic</small>
                </div>
                <div class="mood-option" onclick="checkin.setMood('happy', 80)">
                    <span class="mood-emoji">😊</span>
                    <div class="fw-medium">Happy</div>
                    <small class="text-muted">Good mood, active</small>
                </div>
                <div class="mood-option" onclick="checkin.setMood('neutral', 65)">
                    <span class="mood-emoji">😐</span>
                    <div class="fw-medium">Neutral</div>
                    <small class="text-muted">Normal day</small>
                </div>
                <div class="mood-option" onclick="checkin.setMood('tired', 50)">
                    <span class="mood-emoji">😴</span>
                    <div class="fw-medium">Tired</div>
                    <small class="text-muted">Low energy</small>
                </div>
                <div class="mood-option" onclick="checkin.setMood('unwell', 35)">
                    <span class="mood-emoji">🤒</span>
                    <div class="fw-medium">Unwell</div>
                    <small class="text-muted">Needs attention</small>
                </div>
                <div class="mood-option" onclick="checkin.setMood('stressed', 20)">
                    <span class="mood-emoji">😰</span>
                    <div class="fw-medium">Stressed</div>
                    <small class="text-muted">Anxious/Stressed</small>
                </div>
            </div>

            <div class="text-center mt-5">
                <button class="btn btn-primary px-5" onclick="checkin.nextStep()">
                    Continue <i class="bi bi-arrow-right ms-2"></i>
                </button>
            </div>
        </div>

        <!-- Step 2: Signals -->
        <div id="step-2" class="checkin-step">
            <div class="text-center mb-3">
                <h4 class="mb-2">Daily Signals</h4>
                <p class="text-muted">Swipe cards to indicate wellness signals</p>
            </div>

            <div class="swipe-container" id="swipe-container"></div>

            <div class="text-center mt-4 d-flex flex-column gap-2">
                <div class="d-flex justify-content-center gap-3 w-100">
                    <button class="btn btn-outline flex-grow-1" onclick="checkin.swipe('left')">
                        <i class="bi bi-x-lg me-2"></i> Needs Attention
                    </button>
                    <button class="btn btn-primary flex-grow-1" onclick="checkin.swipe('right')">
                        <i class="bi bi-check-lg me-2"></i> All Good
                    </button>
                </div>
                <small class="text-muted mt-2">Or swipe card directly</small>
            </div>
        </div>

        <!-- Step 3: Notes -->
        <div id="step-3" class="checkin-step">
            <div class="text-center mb-5">
                <h4 class="mb-2">Add Notes</h4>
                <p class="text-muted">Optional observations for today</p>
            </div>

            <div class="card p-4 mb-4">
                <textarea class="form-control border-0 bg-surface" id="checkin-notes" rows="4" 
                          placeholder="Enter any observations about your pet today..." style="resize: none;"></textarea>
            </div>

            <div class="mb-4">
                <label class="form-label fw-medium">Check-in Date</label>
                <input type="date" class="form-control" id="checkin-date">
            </div>

            <div class="d-grid gap-2">
                <button class="btn btn-primary" onclick="checkin.complete()">
                    Complete Check-in
                </button>
                <button class="btn btn-outline" onclick="checkin.previousStep()">
                    <i class="bi bi-arrow-left me-2"></i> Back
                </button>
            </div>
        </div>

        <!-- Step 4: Results -->
        <div id="step-4" class="checkin-step">
            <div class="text-center py-4">
                <div class="display-1 text-gradient mb-4" id="result-score">0</div>
                <div class="badge bg-primary px-4 py-2 mb-4 fs-5" id="result-status">--</div>
                
                <div class="row g-4 mb-5">
                    <div class="col-md-6">
                        <div class="card p-4 text-center h-100">
                            <div class="text-success fw-medium mb-2">Strongest Area</div>
                            <div class="fs-4 fw-bold" id="result-strength">--</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-4 text-center h-100">
                            <div class="text-danger fw-medium mb-2">Needs Attention</div>
                            <div class="fs-4 fw-bold" id="result-weakness">--</div>
                        </div>
                    </div>
                </div>

                <div class="card p-4 mb-5 text-start">
                    <div class="d-flex align-items-start">
                        <i class="bi bi-lightbulb text-primary fs-4 me-3 mt-1"></i>
                        <div>
                            <div class="fw-medium mb-2">Recommendation</div>
                            <div id="result-recommendation">Based on today's check-in</div>
                        </div>
                    </div>
                </div>

                <div class="d-grid gap-2">
                    <button class="btn btn-primary" onclick="checkin.save()">
                        <i class="bi bi-check-circle me-2"></i> Save to History
                    </button>
                    <button class="btn btn-outline" onclick="app.navigate('dashboard')">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>