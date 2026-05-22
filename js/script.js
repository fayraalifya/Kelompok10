/* =========================================================
   GEODBD WEBGIS - JAVASCRIPT TERORGANISIR
   ========================================================= */

/* ============================================
   DAFTAR ISI
   ============================================
    1.  INISIALISASI HALAMAN
    2.  LAYAR LOADING
    3.  FUNGSIONALITAS NAVBAR
    4.  SMOOTH SCROLL
    5.  ANIMASI SCROLL REVEAL
    6.  EFEK PARALLAX
    7.  GEO ASSISTANT (Helper Mengambang)
    8.  SISTEM MODAL (Statistik Interaktif)
    9.  ANIMASI HOVER FOTO TIM
    10. ANIMASI COUNTER
    11. FUNGSI UTILITAS
   ============================================ */


/* ============================================
   1. INISIALISASI HALAMAN
   ============================================ */

// Reset posisi scroll saat halaman dimuat
history.scrollRestoration = "manual";

window.onload = function() {
    window.scrollTo(0, 0);
    document.body.style.opacity = "1";
    console.log("GEODBD Berhasil Dimuat 🚀");
};

// Progress bar scroll
window.addEventListener("scroll", function() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
});


/* ============================================
   2. LAYAR LOADING
   ============================================ */

window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    
    if (loader) {
        // Sembunyikan loader setelah 3 detik
        setTimeout(function() {
            loader.classList.add('hide');
        }, 3000);
    }
});


/* ============================================
   3. FUNGSIONALITAS NAVBAR
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item');
    const navbar = document.querySelector('.navbar');

    // Status aktif saat scroll
    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 120;
            
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href && href.includes(current) && current !== '') {
                link.classList.add('active');
            }
            
            // Set aktif untuk beranda saat di atas
            if (window.scrollY < 100 && href === '#home') {
                link.classList.add('active');
            }
        });
    });

    // Background navbar saat scroll
    window.addEventListener('scroll', function() {
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(15, 15, 15, 0.85)";
            navbar.style.backdropFilter = "blur(20px)";
            navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.12)";
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.08)";
            navbar.style.backdropFilter = "blur(18px)";
            navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.08)";
        }
    });
});


/* ============================================
   4. SMOOTH SCROLL
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Lewati jika href hanya "#"
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            // Smooth scroll ke section
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
});


/* ============================================
   5. ANIMASI SCROLL REVEAL
   ============================================ */

window.addEventListener('scroll', function() {
    const revealCards = document.querySelectorAll('.card');
    
    revealCards.forEach(function(card) {
        const top = card.getBoundingClientRect().top;
        
        if (top < window.innerHeight - 100) {
            card.classList.add('show');
        }
    });
});


/* ============================================
   6. EFEK PARALLAX
   ============================================ */

// Parallax background hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = offset * 0.5 + "px";
    }
});

// Efek maskot mengambang
window.addEventListener('mousemove', function(e) {
    const floatingItems = document.querySelectorAll('.maskot-floating');
    
    if (floatingItems.length > 0) {
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;

        floatingItems.forEach(function(item) {
            item.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});


/* ============================================
   7. GEO ASSISTANT (Helper Mengambang)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const assistant = document.querySelector('.geo-assistant');
    const assistantToggle = document.querySelector('.assistant-toggle');

    if (assistantToggle && assistant) {
        assistantToggle.addEventListener('click', function() {
            assistant.classList.toggle('active');
        });
    }

    // Pergantian tab
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Hapus active dari semua
            tabButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            tabContents.forEach(function(content) {
                content.classList.remove('active');
            });

            // Tambahkan active ke yang diklik
            button.classList.add('active');

            // Tampilkan konten yang sesuai
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});


/* ============================================
   8. SISTEM MODAL (Statistik Interaktif)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    const statModal = document.getElementById('statModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (!statModal) return;

    // ── Data REAL lengkap per tahun ──────────────────────────
    const fullData = {
    2020: [
        { name: 'Benowo', cases: 10 },
        { name: 'Rungkut', cases: 7 },
        { name: 'Krembangan', cases: 6 },
        { name: 'Pabean Cantian', cases: 6 },
        { name: 'Sawahan', cases: 6 },
        { name: 'Tambaksari', cases: 6 },
        { name: 'Tandes', cases: 5 },
        { name: 'Dukuh Pakis', cases: 5 },
        { name: 'Wonocolo', cases: 3 },
        { name: 'Karang Pilang', cases: 2 }
    ],
    2021: [
        { name: 'Rungkut', cases: 15 },
        { name: 'Semampir', cases: 8 },
        { name: 'Bubutan', cases: 7 },
        { name: 'Simokerto', cases: 6 },
        { name: 'Dukuh Pakis', cases: 6 },
        { name: 'Mulyorejo', cases: 5 },
        { name: 'Pakal', cases: 5 },
        { name: 'Wonokromo', cases: 5 },
        { name: 'Tambaksari', cases: 5 },
        { name: 'Gunung Anyar', cases: 4 }
    ],
    2022: [
        { name: 'Tambaksari', cases: 25 },
        { name: 'Mulyorejo', cases: 23 },
        { name: 'Dukuh Pakis', cases: 13 },
        { name: 'Simokerto', cases: 12 },
        { name: 'Rungkut', cases: 12 },
        { name: 'Lakarsantri', cases: 10 },
        { name: 'Jambangan', cases: 8 },
        { name: 'Semampir', cases: 8 },
        { name: 'Wiyung', cases: 8 },
        { name: 'Gayungan', cases: 6 }
    ],
    2023: [
        { name: 'Benowo', cases: 21 },
        { name: 'Tandes', cases: 17 },
        { name: 'Tambaksari', cases: 15 },
        { name: 'Sukomanunggal', cases: 12 },
        { name: 'Semampir', cases: 11 },
        { name: 'Wiyung', cases: 11 },
        { name: 'Rungkut', cases: 9 },
        { name: 'Lakarsantri', cases: 9 },
        { name: 'Tegalsari', cases: 9 },
        { name: 'Dukuh Pakis', cases: 8 }
    ],
    2024: [
        { name: 'Sawahan', cases: 20 },
        { name: 'Tambaksari', cases: 19 },
        { name: 'Tandes', cases: 15 },
        { name: 'Pakal', cases: 15 },
        { name: 'Rungkut', cases: 14 },
        { name: 'Sambikerep', cases: 12 },
        { name: 'Sukomanunggal', cases: 12 },
        { name: 'Gunung Anyar', cases: 10 },
        { name: 'Benowo', cases: 10 },
        { name: 'Tenggilis Mejoyo', cases: 10 }
    ]
};

    // ── Konfigurasi Konten Modal ─────────────────────────────
    const modalData = {
        cases: {
            tag: 'KASUS DBD SURABAYA',
            title: 'Tren Kasus DBD Surabaya 2020-2024',
            description: 'Grafik menunjukkan peningkatan kasus Demam Berdarah Dengue di Kota Surabaya selama 5 tahun terakhir.',
            yearlyData: [
                { year: '2020', cases: 73, color: '#ff9999' },
                { year: '2021', cases: 111, color: '#ff7777' },
                { year: '2022', cases: 195, color: '#ff5555' },
                { year: '2023', cases: 191, color: '#ff4444' },
                { year: '2024', cases: 231, color: '#ff3333' }
            ]
        },
        highest: {
            tag: 'KASUS TERTINGGI PER KECAMATAN',
            title: 'Top 10 Kecamatan dengan Kasus Tertinggi',
            description: 'Pilih tahun untuk melihat 10 kecamatan dengan kasus DBD terbanyak.',
            hasYearFilter: true,
            fullData: fullData
        },
        districts: {
            tag: 'WILAYAH MONITORING',
            title: '31 Wilayah yang Dipantau',
            description: 'Seluruh wilayah di Kota Surabaya termasuk dalam sistem monitoring risiko DBD.',
            list: [
                'Asemrowo', 'Benowo', 'Bubutan', 'Bulak', 'Dukuh Pakis',
                'Gayungan', 'Genteng', 'Gubeng', 'Gunung Anyar', 'Jambangan',
                'Karang Pilang', 'Kenjeran', 'Krembangan', 'Lakarsantri', 'Mulyorejo',
                'Pabean Cantian', 'Pakal', 'Rungkut', 'Sambikerep', 'Sawahan',
                'Semampir', 'Simokerto', 'Sukolilo', 'Sukomanunggal', 'Tambaksari',
                'Tandes', 'Tegalsari', 'Tenggilis Mejoyo', 'Wiyung', 'Wonocolo',
                'Wonokromo'
            ]
        },
        luas: {
            tag: 'LUAS WILAYAH',
            title: 'Luas Wilayah per Kecamatan',
            description: 'Data luas wilayah (km²) masing-masing kecamatan di Kota Surabaya.',
            luasTable: true,
            luasData: [
                { no: 1, name: 'Asemrowo', luas: 15.05 },
                { no: 2, name: 'Benowo', luas: 26.64 },
                { no: 3, name: 'Bubutan', luas: 3.89 },
                { no: 4, name: 'Bulak', luas: 6.24 },
                { no: 5, name: 'Dukuh Pakis', luas: 10.26 },
                { no: 6, name: 'Gayungan', luas: 5.89 },
                { no: 7, name: 'Genteng', luas: 4.06 },
                { no: 8, name: 'Gubeng', luas: 7.90 },
                { no: 9, name: 'Gunung Anyar', luas: 10.15 },
                { no: 10, name: 'Jambangan', luas: 4.10 },
                { no: 11, name: 'Karang Pilang', luas: 9.39 },
                { no: 12, name: 'Kenjeran', luas: 8.51 },
                { no: 13, name: 'Krembangan', luas: 8.60 },
                { no: 14, name: 'Lakarsantri', luas: 18.90 },
                { no: 15, name: 'Mulyorejo', luas: 17.37 },
                { no: 16, name: 'Pabean Cantian', luas: 5.48 },
                { no: 17, name: 'Pakal', luas: 18.57 },
                { no: 18, name: 'Rungkut', luas: 22.91 },
                { no: 19, name: 'Sambikerep', luas: 17.17 },
                { no: 20, name: 'Sawahan', luas: 7.18 },
                { no: 21, name: 'Semampir', luas: 9.05 },
                { no: 22, name: 'Simokerto', luas: 2.61 },
                { no: 23, name: 'Sukolilo', luas: 30.15 },
                { no: 24, name: 'Sukomanunggal', luas: 9.27 },
                { no: 25, name: 'Tambaksari', luas: 8.97 },
                { no: 26, name: 'Tandes', luas: 9.94 },
                { no: 27, name: 'Tegalsari', luas: 4.31 },
                { no: 28, name: 'Tenggilis Mejoyo', luas: 5.81 },
                { no: 29, name: 'Wiyung', luas: 12.38 },
                { no: 30, name: 'Wonocolo', luas: 6.53 },
                { no: 31, name: 'Wonokromo', luas: 8.26 }
            ]
        },
        timeline: {
            tag: 'PERIODE PENELITIAN',
            title: 'Data Time-Series 2020-2024',
            description: 'Periode pengumpulan data penelitian untuk pemodelan risiko DBD berbasis analisis spasial di Kota Surabaya.',
            simple: true
        }
    };

    // ── Generate Grafik Batang Modern (Vertikal) ────────────
    function generateModernChart(data) {
        const maxCases = Math.max.apply(null, data.map(function(d) { return d.cases; }));

        const bars = data.map(function(item) {
            const height = (item.cases / maxCases) * 100;
            return `
                <div class="chart-column">
                    <div class="chart-bar-wrapper">
                        <div class="chart-bar-modern"
                             style="height: ${height}%; background: ${item.color};"
                             data-value="${item.cases}">
                            <span class="bar-value">${item.cases}</span>
                        </div>
                    </div>
                    <div class="chart-label-modern">${item.year}</div>
                </div>
            `;
        }).join('');

        return `<div class="modern-chart">${bars}</div>`;
    }

    // ── Generate Tab Filter Tahun ────────────────────────────
    function generateYearFilter(selectedYear) {
        const years = [2020, 2021, 2022, 2023, 2024];
        
        const buttons = years.map(function(year) {
            const activeClass = year === selectedYear ? 'active' : '';
            return `
                <button class="year-btn ${activeClass}" data-year="${year}">
                    ${year}
                </button>
            `;
        }).join('');

        return `<div class="year-filter">${buttons}</div>`;
    }

    // ── Generate Top 10 dengan animasi ──────────────────────
    function generateTop10(topData) {
        const maxCases = Math.max.apply(null, topData.map(function(d) { return d.cases; }));
        const colors = [
            '#ff3333', '#ff4444', '#ff5555', '#ff6666', '#ff7777',
            '#ff8888', '#ff9999', '#ffaaaa', '#ffbbbb', '#ffcccc'
        ];

        const items = topData.map(function(item, index) {
            const width = (item.cases / maxCases) * 100;
            const delay = index * 0.05;
            return `
                <div class="top10-item" style="animation-delay: ${delay}s;">
                    <div class="top10-rank">${index + 1}</div>
                    <div class="top10-info">
                        <div class="top10-name">${item.name}</div>
                        <div class="top10-bar-container">
                            <div class="top10-bar"
                                 style="width: ${width}%; background: ${colors[index]};">
                            </div>
                        </div>
                    </div>
                    <div class="top10-cases">${item.cases} kasus</div>
                </div>
            `;
        }).join('');

        return `<div class="modal-top10">${items}</div>`;
    }

    // ── Generate daftar wilayah ───────────────────────────────
    function generateList(items) {
        const listItems = items.map(function(item, index) {
            const delay = index * 0.02;
            return `
                <div class="list-item" style="animation-delay: ${delay}s;">
                    <strong>${index + 1}. ${item}</strong>
                </div>
            `;
        }).join('');

        return `<div class="modal-list">${listItems}</div>`;
    }

    // ── Generate tabel luas wilayah ───────────────────────────
    function generateLuasTable(rows) {
        const luasValues = rows.map(function(r) { return r.luas; });
        const maxLuas = Math.max.apply(null, luasValues);
        const minLuas = Math.min.apply(null, luasValues);
        const totalLuas = rows.reduce(function(sum, r) { return sum + r.luas; }, 0).toFixed(2);

        const summary = `
            <div class="luas-summary">
                <div class="luas-stat"><span>${rows.length}</span><small>Wilayah</small></div>
                <div class="luas-stat"><span>${totalLuas}</span><small>Total km²</small></div>
                <div class="luas-stat"><span>${minLuas}</span><small>Terkecil (km²)</small></div>
                <div class="luas-stat"><span>${maxLuas}</span><small>Terluas (km²)</small></div>
            </div>
        `;

        const rowItems = rows.map(function(r, i) {
            const width = (r.luas / maxLuas) * 100;
            const delay = i * 0.03;
            return `
                <div class="luas-row" style="animation-delay: ${delay}s;">
                    <span class="luas-no">${r.no}</span>
                    <span class="luas-name">${r.name}</span>
                    <div class="luas-bar-wrap">
                        <div class="luas-bar" style="width: ${width}%"></div>
                    </div>
                    <span class="luas-val">${r.luas} km²</span>
                </div>
            `;
        }).join('');

        return summary + `<div class="luas-list">${rowItems}</div>`;
    }

    // ── Generate kotak info sederhana ───────────────────────────
    function generateSimpleInfo() {
        return `
            <div class="simple-info">
                <div class="info-box">
                    <div class="info-icon">📅</div>
                    <div class="info-text">
                        <h4>5 Tahun Data</h4>
                        <p>Periode analisis komprehensif dari tahun 2020 hingga 2024</p>
                    </div>
                </div>
                <div class="info-box">
                    <div class="info-icon">📊</div>
                    <div class="info-text">
                        <h4>Data Time-Series</h4>
                        <p>Analisis tren temporal untuk pemodelan prediksi risiko DBD</p>
                    </div>
                </div>
                <div class="info-box">
                    <div class="info-icon">🗺️</div>
                    <div class="info-text">
                        <h4>Analisis Spasial</h4>
                        <p>Integrasi data geografis dengan variabel lingkungan</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ── Buka Modal ───────────────────────────────────────────
    // Mendukung .why-stat-card dan .stat-interactive
    const allStatCards = document.querySelectorAll('.why-stat-card, .stat-interactive');

    allStatCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const modalType = card.getAttribute('data-modal');
            const data = modalData[modalType];

            if (!data) return;

            // Bangun konten modal
            let contentHTML = `
                <div class="modal-header">
                    <span class="modal-tag">${data.tag}</span>
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                </div>
            `;

            if (data.yearlyData) {
                contentHTML += `<div class="modal-chart-modern">${generateModernChart(data.yearlyData)}</div>`;
            }

            if (data.hasYearFilter) {
                const currentYear = 2024;
                contentHTML += generateYearFilter(currentYear);
                contentHTML += `<div id="top10Container">${generateTop10(data.fullData[currentYear])}</div>`;
            }

            if (data.list) contentHTML += generateList(data.list);
            if (data.luasTable) contentHTML += generateLuasTable(data.luasData);
            if (data.simple) contentHTML += generateSimpleInfo();

            modalBody.innerHTML = contentHTML;
            statModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Event listener untuk filter tahun
            if (data.hasYearFilter) {
                const yearButtons = modalBody.querySelectorAll('.year-btn');
                yearButtons.forEach(function(btn) {
                    btn.addEventListener('click', function(e) {
                        const year = parseInt(e.target.getAttribute('data-year'));

                        // Update tombol aktif
                        yearButtons.forEach(function(b) {
                            b.classList.remove('active');
                        });
                        e.target.classList.add('active');

                        // Update daftar top 10
                        const container = document.getElementById('top10Container');
                        container.innerHTML = generateTop10(data.fullData[year]);
                    });
                });
            }
        });
    });

    // ── Tutup Modal ──────────────────────────────────────────
    function closeModal() {
        statModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && statModal && statModal.classList.contains('active')) {
            closeModal();
        }
    });

});


/* ============================================
   9. ANIMASI HOVER FOTO TIM
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const hexItems = document.querySelectorAll('.hex-item');

    hexItems.forEach(function(item) {
        const photos = item.querySelectorAll('.member-photo img');
        let currentPhoto = 0;
        let photoInterval;

        // Slide otomatis foto setiap 2 detik
        function startPhotoRotation() {
            photoInterval = setInterval(function() {
                photos[currentPhoto].style.opacity = '0';
                currentPhoto = (currentPhoto + 1) % photos.length;
                photos[currentPhoto].style.opacity = '1';
            }, 2000);
        }

        // Jeda saat hover
        item.addEventListener('mouseenter', function() {
            clearInterval(photoInterval);
        });

        // Lanjutkan saat mouse keluar
        item.addEventListener('mouseleave', function() {
            startPhotoRotation();
        });

        // Mulai rotasi otomatis
        startPhotoRotation();
    });
});


/* ============================================
   10. ANIMASI COUNTER
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-value');

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 detik
        const increment = target / (duration / 16); // ~60fps
        let current = 0;

        function updateCounter() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        updateCounter();
    }

    // Trigger counter saat elemen masuk viewport
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Animasi hanya sekali
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
        observer.observe(counter);
    });
});


/* ============================================
   11. FUNGSI UTILITAS
   ============================================ */

// Efek hover tombol
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-overview, .btn-webgis');

    buttons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            button.style.transition = "0.35s ease";
        });
    });
});

// Console log untuk debugging
console.log("Semua script berhasil dimuat! 🎉");