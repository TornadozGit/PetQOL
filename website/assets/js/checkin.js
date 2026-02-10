// ===== CHECK-IN SYSTEM =====
        class CheckinSystem {
            constructor() {
                this.step = 1;
                this.data = {
                    mood: null,
                    moodScore: 0,
                    cards: [],
                    responses: {},
                    notes: '',
                    date: new Date().toISOString().split('T')[0]
                };
                this.cards = [
                    { id: 'appetite', text: 'Normal appetite today', pillar: 'Physical', icon: 'bi-egg-fried' },
                    { id: 'energy', text: 'Good energy levels', pillar: 'Physical', icon: 'bi-lightning' },
                    { id: 'sleep', text: 'Restful sleep patterns', pillar: 'Physical', icon: 'bi-moon' },
                    { id: 'stress', text: 'Calm and relaxed', pillar: 'Emotional', icon: 'bi-heart' },
                    { id: 'environment', text: 'Comfortable environment', pillar: 'Environment', icon: 'bi-house' },
                    { id: 'routine', text: 'Consistent daily routine', pillar: 'Environment', icon: 'bi-clock' },
                    { id: 'social', text: 'Social and interactive', pillar: 'Enrichment', icon: 'bi-people' },
                    { id: 'play', text: 'Engaged in play', pillar: 'Enrichment', icon: 'bi-controller' }
                ];
            }

            reset() {
                this.step = 1;
                this.data = {
                    mood: null,
                    moodScore: 0,
                    cards: [...this.cards].sort(() => Math.random() - 0.5),
                    responses: {},
                    notes: '',
                    date: new Date().toISOString().split('T')[0]
                };
                
                this.updateStep();
                this.updatePetName();
            }

            updateStep() {
                // Update UI
                document.querySelectorAll('.checkin-step').forEach(el => {
                    el.classList.remove('active');
                });
                document.getElementById(`step-${this.step}`).classList.add('active');
                
                // Update progress
                const progress = (this.step / 4) * 100;
                document.getElementById('checkin-progress').style.width = `${progress}%`;
                document.getElementById('checkin-step').textContent = `Step ${this.step} of 4`;
                
                // Load step-specific content
                if (this.step === 2) {
                    this.loadCards();
                }
                
                if (this.step === 3) {
                    document.getElementById('checkin-date').value = this.data.date;
                }
            }

            updatePetName() {
                if (app.currentPet) {
                    document.getElementById('checkin-pet-name').textContent = app.currentPet.name;
                }
            }

            setMood(mood, score) {
                this.data.mood = mood;
                this.data.moodScore = score;
                
                // Update UI
                document.querySelectorAll('.mood-option').forEach(option => {
                    option.classList.remove('selected');
                });
                event.currentTarget.classList.add('selected');
            }

            nextStep() {
                if (this.step === 1 && !this.data.mood) {
                    app.showToast('Please select a mood', 'error');
                    return;
                }
                
                this.step++;
                this.updateStep();
            }

            previousStep() {
                if (this.step > 1) {
                    this.step--;
                    this.updateStep();
                }
            }

            loadCards() {
                const container = document.getElementById('swipe-container');
                container.innerHTML = '';
                
                this.data.cards.slice(0, 3).forEach((card, index) => {
                    const cardEl = document.createElement('div');
                    cardEl.className = 'swipe-card';
                    cardEl.style.zIndex = 100 - index;
                    cardEl.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.05})`;
                    
                    cardEl.innerHTML = `
                        <div class="swipe-overlay overlay-like">Good</div>
                        <div class="swipe-overlay overlay-dislike">Attention</div>
                        <i class="bi ${card.icon} card-icon"></i>
                        <h5 class="mb-3">${card.pillar}</h5>
                        <p class="text-muted mb-0">${card.text}</p>
                        <small class="text-muted mt-4">Swipe or use buttons</small>
                    `;
                    
                    container.appendChild(cardEl);
                    
                    if (index === 0) {
                        this.attachSwipeEvents(cardEl, card.id);
                    }
                });
            }

            attachSwipeEvents(element, cardId) {
                let startX = 0;
                
                element.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                }, {passive: true});
                
                element.addEventListener('touchend', (e) => {
                    const endX = e.changedTouches[0].clientX;
                    const diff = endX - startX;
                    if (diff > 50) this.swipeCard(cardId, 'right', element);
                    else if (diff < -50) this.swipeCard(cardId, 'left', element);
                }, {passive: true});
                
                element.addEventListener('mousedown', (e) => {
                    startX = e.clientX;
                    const onMouseUp = (e) => {
                        const endX = e.clientX;
                        const diff = endX - startX;
                        if (diff > 50) this.swipeCard(cardId, 'right', element);
                        else if (diff < -50) this.swipeCard(cardId, 'left', element);
                        document.removeEventListener('mouseup', onMouseUp);
                    };
                    document.addEventListener('mouseup', onMouseUp);
                });
            }

            swipe(direction) {
                const currentCard = this.data.cards[0];
                if (currentCard) {
                    const cardEl = document.querySelector('.swipe-card');
                    this.swipeCard(currentCard.id, direction, cardEl);
                }
            }

            swipeCard(cardId, direction, element) {
                // Save response
                this.data.responses[cardId] = direction === 'right' ? 9 : 5;
                
                // Animate card
                const moveX = direction === 'right' ? 400 : -400;
                element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                element.style.transform = `translateX(${moveX}px) rotate(${direction === 'right' ? 20 : -20}deg)`;
                element.style.opacity = '0';
                
                // Remove card from deck
                this.data.cards.shift();
                
                // Load next card or move to next step
                setTimeout(() => {
                    if (this.data.cards.length > 0) {
                        this.loadCards();
                    } else {
                        this.step = 3;
                        this.updateStep();
                    }
                }, 300);
            }

            complete() {
                this.data.notes = document.getElementById('checkin-notes').value;
                this.data.date = document.getElementById('checkin-date').value || new Date().toISOString().split('T')[0];
                
                // Calculate final score
                const moodWeight = 0.3;
                const cardsWeight = 0.7;
                
                const cardScores = Object.values(this.data.responses);
                const cardAverage = cardScores.length > 0 
                    ? (cardScores.reduce((a, b) => a + b, 0) / cardScores.length) * 10
                    : 50;
                
                const finalScore = Math.round(
                    (this.data.moodScore * moodWeight) + (cardAverage * cardsWeight)
                );
                
                // Calculate pillars
                const pillars = { Physical: 0, Emotional: 0, Environment: 0, Enrichment: 0 };
                const counts = { Physical: 0, Emotional: 0, Environment: 0, Enrichment: 0 };
                
                this.cards.forEach(card => {
                    const score = this.data.responses[card.id];
                    if (score) {
                        pillars[card.pillar] += score;
                        counts[card.pillar]++;
                    }
                });
                
                Object.keys(pillars).forEach(pillar => {
                    pillars[pillar] = counts[pillar] > 0 
                        ? Math.round((pillars[pillar] / (counts[pillar] * 9)) * 100)
                        : 50;
                });
                
                // Find strongest and weakest
                const pillarEntries = Object.entries(pillars);
                const strongest = pillarEntries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
                const weakest = pillarEntries.reduce((a, b) => a[1] < b[1] ? a : b)[0];
                
                // Store results
                this.data.finalScore = finalScore;
                this.data.pillars = pillars;
                this.data.strongest = strongest;
                this.data.weakest = weakest;
                
                // Show results
                this.showResults();
            }

            showResults() {
                this.step = 4;
                this.updateStep();
                
                // Update UI
                document.getElementById('result-score').textContent = this.data.finalScore;
                document.getElementById('result-status').textContent = app.getStatusLabel(this.data.finalScore);
                document.getElementById('result-strength').textContent = this.data.strongest;
                document.getElementById('result-weakness').textContent = this.data.weakest;
                
                // Get recommendation
                const recommendations = {
                    Physical: ['Increase exercise gradually', 'Monitor diet and hydration', 'Schedule vet check-up'],
                    Emotional: ['Add calming activities', 'Provide safe spaces', 'Reduce stressors'],
                    Environment: ['Improve living conditions', 'Maintain clean space', 'Ensure comfort'],
                    Enrichment: ['Introduce new toys', 'Increase playtime', 'Try new activities']
                };
                
                const rec = recommendations[this.data.weakest] || ['Continue regular monitoring'];
                document.getElementById('result-recommendation').textContent = rec[0];
                
                // Confetti celebration
                this.fireConfetti();
            }

            save() {
                if (!app.currentPet) {
                    app.showToast('Select a pet first', 'error');
                    return;
                }
                
                const log = {
                    id: Date.now().toString(),
                    petId: app.currentPet.id,
                    date: this.data.date,
                    score: this.data.finalScore,
                    mood: this.data.mood,
                    moodScore: this.data.moodScore,
                    notes: this.data.notes,
                    pillars: this.data.pillars,
                    strongest: this.data.strongest,
                    weakest: this.data.weakest,
                    responses: this.data.responses,
                    timestamp: new Date().toISOString()
                };
                
                // Save to localStorage
                const logs = JSON.parse(localStorage.getItem(`petqol_logs_${app.currentPet.id}`) || '[]');
                logs.unshift(log);
                localStorage.setItem(`petqol_logs_${app.currentPet.id}`, JSON.stringify(logs));
                
                app.showToast('Check-in saved successfully! 🎉');
                
                // Navigate back to dashboard
                setTimeout(() => {
                    app.navigate('dashboard');
                }, 1500);
            }

            fireConfetti() {
                const colors = ['#4F46E5', '#10B981', '#F59E0B', '#3B82F6'];
                for (let i = 0; i < 50; i++) {
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: fixed;
                        width: ${Math.random() * 10 + 5}px;
                        height: ${Math.random() * 10 + 5}px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                        top: -20px;
                        left: ${Math.random() * 100}vw;
                        opacity: ${Math.random() * 0.5 + 0.5};
                        transform: rotate(${Math.random() * 360}deg);
                        animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
                        z-index: 10000;
                        pointer-events: none;
                    `;
                    
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }
                
                // Add animation style
                if (!document.getElementById('confetti-style')) {
                    const style = document.createElement('style');
                    style.id = 'confetti-style';
                    style.textContent = `
                        @keyframes confetti-fall {
                            0% {
                                transform: translateY(0) rotate(0deg);
                                opacity: 1;
                            }
                            100% {
                                transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }