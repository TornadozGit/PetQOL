<section id="insights" class="section">
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
        <div>
            <h2 class="display-2 mb-1">Wellness Insights</h2>
            <p class="text-muted">Data-driven pet wellness analysis</p>
        </div>
        <button class="btn btn-primary" onclick="app.refreshInsights()">
            <i class="bi bi-arrow-clockwise me-2"></i> Refresh
        </button>
    </div>

    <div class="insights-grid">
        <div class="card pillar-chart">
            <h5 class="mb-3">Wellness Pillars</h5>
            <div class="chart-label">
                <span>Physical Health</span>
                <span id="pillar-physical">--%</span>
            </div>
            <div class="chart-bar">
                <div class="chart-fill bg-primary" id="pillar-physical-bar" style="width: 0%"></div>
            </div>

            <div class="chart-label">
                <span>Emotional Wellbeing</span>
                <span id="pillar-emotional">--%</span>
            </div>
            <div class="chart-bar">
                <div class="chart-fill bg-success" id="pillar-emotional-bar" style="width: 0%"></div>
            </div>

            <div class="chart-label">
                <span>Environment</span>
                <span id="pillar-environment">--%</span>
            </div>
            <div class="chart-bar">
                <div class="chart-fill bg-warning" id="pillar-environment-bar" style="width: 0%"></div>
            </div>

            <div class="chart-label">
                <span>Enrichment</span>
                <span id="pillar-enrichment">--%</span>
            </div>
            <div class="chart-bar">
                <div class="chart-fill bg-info" id="pillar-enrichment-bar" style="width: 0%"></div>
            </div>
        </div>

        <div class="card p-4">
            <h5 class="mb-3">Trend Analysis</h5>
            <div id="trend-chart" style="height: 300px;">
                <div class="d-flex align-items-end h-100 gap-2">
                    <div class="flex-grow-1 text-center">
                        <p class="text-muted">More data needed for trends</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card p-4">
            <h5 class="mb-3">Patterns & Recommendations</h5>
            <div id="patterns-list">
                <!-- Filled by JavaScript -->
            </div>
        </div>

        <div class="card p-4">
            <h5 class="mb-3">Weekly Focus</h5>
            <div class="mb-4">
                <div class="fw-medium mb-2">Priority Area:</div>
                <div class="badge bg-primary px-3 py-2" id="focus-priority">--</div>
            </div>
            <div>
                <div class="fw-medium mb-2">Action Items:</div>
                <ul class="list-unstyled" id="focus-actions">
                    <!-- Filled by JavaScript -->
                </ul>
            </div>
        </div>
    </div>
</section>