export const backgroundColor = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 126, 111, 0.5)',
    'rgba(1, 143, 252, 0.5)',
    'rgba(255, 126, 252, 0.5)',
    'rgba(152, 255, 252, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(152, 255, 77, 0.5)',
    'rgba(152, 94, 77, 0.5)',
];
export const borderColor = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 126, 111, 1)',
    'rgba(1, 143, 252, 1)',
    'rgba(255, 126, 252, 1)',
    'rgba(152, 255, 252, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(152, 255, 77, 1)',
    'rgba(152, 94, 77, 1)',
];

export const months = {
    en: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    id: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ],
};

export const options = {
    legend: {
        position: 'bottom',
    },
    responsive: false,
    maintainAspectRatio: false,
    scales: {
        xAxes: [
            {
                display: true,
            },
        ],
    },
};

export const purchasingGraph = [
    {
        model: 'debt',
        period: 'month',
        title: { en: 'Purchasing Debt Per Month Graph', id: 'Grafik Hutang Pembelian Per Bulan' },
        type: 'bar',
    },
    {
        model: 'summary',
        period: 'month',
        title: {
            en: 'Purchasing Summary Per Month Graph',
            id: 'Grafik Rangkuman Pembelian Per Bulan',
        },
        type: 'bar',
    },
];
export const purchasingLabel = {
    en: 'Purchasing Debt Per Month',
    id: 'Hutang Pembelian Per Bulan',
};
export const purchasingSummaryLabel = {
    en: 'Purchasing Summary Per Month',
    id: 'Rangkuman Pembelian Per Bulan',
};

export const salesGraph = [
    {
        period: 'day',
        title: { en: 'Sales Per Day Graph', id: 'Grafik Penjualan Per Hari' },
        type: 'line',
    },
    {
        period: 'month',
        title: { en: 'Sales Per Month Graph', id: 'Grafik Penjualan Per Bulan' },
        type: 'bar',
    },
];
export const salesLabel = {
    day: { en: 'Sales Per Day', id: 'Penjualan Per Hari' },
    month: { en: 'Sales Per Month', id: 'Penjualan Per Bulan' },
};
