<?php
/**
 * PetQOL - Main Entry Point
 * Organized with Includes and Page Content Separation
 */
?>
<!DOCTYPE html>
<html lang="en" dir="ltr" data-bs-theme="light">
<head>
    <!-- استدعاء الميتا والروابط -->
    <?php include 'includes/head.php'; ?>
</head>
<body>

    <!-- === SPLASH SCREEN === -->
    <div id="splash-screen">
        <a class="splash-skip" onclick="app.dismissSplash()">Skip</a>
        <div class="splash-icon"><i class="fa-solid fa-paw"></i></div>
        <h1 class="splash-title">PetQOL</h1>
        <h2 class="splash-tagline">Because they can’t tell you… <br>we care for them.</h2>
        <p class="splash-sub">Track your pet’s wellness day by day with clarity and calm.</p>
        <button class="splash-btn" onclick="app.dismissSplash()">Start</button>
        <div class="splash-footer-text">No account needed • Your data stays on your device</div>
    </div>

    <!-- === LAYOUT COMPONENTS === -->
    <?php include 'includes/sidebar.php'; ?>
    <?php include 'includes/header.php'; ?>

    <!-- === MAIN CONTENT (جلب الصفحات) === -->
    <main class="app-container">
        
        <!-- صفحة الداشبورد -->
        <?php include 'pages/dashboard.php'; ?>

        <!-- صفحة الحيوانات الأليفة -->
        <?php include 'pages/pets.php'; ?>

        <!-- صفحة الفحص اليومي -->
        <?php include 'pages/checkin.php'; ?>

        <!-- صفحة السجل -->
        <?php include 'pages/history.php'; ?>

        <!-- صفحة التحليلات -->
        <?php include 'pages/insights.php'; ?>

        <!-- صفحة الخطة الصحية -->
        <?php include 'pages/health.php'; ?>

        <!-- صفحة الاشتراك -->
        <?php include 'pages/premium.php'; ?>

        <!-- صفحة الإعدادات -->
        <?php include 'pages/settings.php'; ?>

    </main>

    <!-- === FOOTER / MOBILE NAV === -->
    <?php include 'includes/footer.php'; ?>

    <!-- === MODALS === -->
    <?php include 'includes/modals.php'; ?>

    <!-- === SCRIPTS === -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/app.js"></script>
    <script src="assets/js/checkin.js"></script>
    
    <script>
        const app = new PetQOL();
        const checkin = new CheckinSystem();
        window.app = app;
        window.checkin = checkin;
        
        document.addEventListener('DOMContentLoaded', () => {
            app.init();
            // Helper styles injection
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            `;
            document.head.appendChild(style);
        });
    </script>
</body>
</html>