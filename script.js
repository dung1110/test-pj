document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('birthForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn form gửi và tải lại trang

        const name = document.getElementById('name').value.trim();
        const birthDate = document.getElementById('birthDate').value;

        if (!birthDate) {
            alert("Vui lòng chọn ngày sinh hợp lệ.");
            return;
        }

        const [year, month, day] = birthDate.split('-').map(Number);

        if (!isValidDate(day, month, year)) {
            alert("Ngày sinh không hợp lệ. Vui lòng kiểm tra lại.");
            return;
        }

        const canChi = calculateCanChiCalendar(year);
        const destiny = calculateDestinyCalendar(year);
        const detailedDestiny = calculateDestinyCalendarDetail(year);
        const zodiac = calculateZodiacSign(day, month);

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p><strong>Tên:</strong> ${name}</p>
            <p><strong>Tuổi:</strong> ${canChi}</p>
            <p><strong>Mệnh:</strong> ${destiny}</p>
            <p><strong>Chi Tiết Mệnh:</strong> ${detailedDestiny}</p>
            <p><strong>Cung Hoàng Đạo:</strong> ${zodiac.eng} (${zodiac.vie})</p>
        `;
    });

    function isValidDate(day, month, year) {
        const date = new Date(year, month - 1, day);
        return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
    }

    function calculateCanChiCalendar(year) {
        const canList = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
        const chiList = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mẹo", "Thìn", "Tỵ", "Ngọ", "Mùi"];
        return `${canList[year % 10]} ${chiList[year % 12]}`;
    }

    function calculateDestinyCalendar(year) {
        const nDict = [4, 4, 5, 5, 1, 1, 2, 2, 3, 3];
        const mDict = [1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 0, 0];
        const elements = ["Kim", "Thuỷ", "Hoả", "Thổ", "Mộc"];
        return elements[(mDict[year % 12] + nDict[year % 10] - 1) % 5];
    }

    function calculateDestinyCalendarDetail(year) {
        const elementDetails = [
            ["Sa Trung Kim", "Hải Trung Kim", "Bạch Lạp Kim", "Kiếm Phong Kim", "Kim Bạc Kim", "Thoa Xuyến Kim"],
            ["Thiên Hà Thuỷ", "Đại Khuê Thuỷ", "Đại Hải Thuỷ", "Giản Hạ Thuỷ", "Tuyền Trung Thuỷ", "Trường Lưu Thuỷ"],
            ["Sơn Hạ Hoả", "Phú Đăng Hoả", "Thiên Thượng Hoả", "Lộ Trung Hoả", "Sơn Đầu Hoả", "Tích Lịch Hoả"],
            ["Bích Thượng Thổ", "Đại Trạch Thổ", "Sa Trung Thổ", "Lộ Bàng Thổ", "Ốc Thượng Thổ", "Thành Đầu Thổ"],
            ["Bình Địa Mộc", "Tang Đố Mộc", "Thạch Lựu Mộc", "Đại Lâm Mộc", "Dương Liễu Mộc", "Tùng Bách Mộc"]
        ];

        const detailsMapping = {
            "34,35": 0, "4,5": 1, "20,21": 2, "12,13": 3, "42,43": 4, "50,51": 5,
            "46,47": 0, "54,55": 1, "2,3": 2, "16,17": 3, "24,25": 4, "32,33": 5,
            "36,37": 0, "44,45": 1, "58,59": 2, "6,7": 3, "14,15": 4, "28,29": 5,
            "40,41": 0, "48,49": 1, "56,57": 2, "10,11": 3, "26,27": 4, "18,19": 5,
            "38,39": 0, "52,53": 1, "0,1": 2, "8,9": 3, "22,23": 4, "30,31": 5
        };

        const nDict = [4, 4, 5, 5, 1, 1, 2, 2, 3, 3];
        const mDict = [1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 0, 0];
        const elementSum = (mDict[year % 12] + nDict[year % 10] - 1) % 5;

        const surplus = year % 60;
        for (const [key, value] of Object.entries(detailsMapping)) {
            const range = key.split(",").map(Number);
            if (range.includes(surplus)) {
                return elementDetails[elementSum][value];
            }
        }

        return "Không xác định";
    }

    function calculateZodiacSign(day, month) {
        const zodiacs = [
            { range: [[12, 22], [1, 19]], eng: "Capricorn", vie: "Ma Kết" },
            { range: [[1, 20], [2, 18]], eng: "Aquarius", vie: "Bảo Bình" },
            { range: [[2, 19], [3, 20]], eng: "Pisces", vie: "Song Ngư" },
            { range: [[3, 21], [4, 19]], eng: "Aries", vie: "Bạch Dương" },
            { range: [[4, 20], [5, 20]], eng: "Taurus", vie: "Kim Ngưu" },
            { range: [[5, 21], [6, 21]], eng: "Gemini", vie: "Song Tử" },
            { range: [[6, 22], [7, 22]], eng: "Cancer", vie: "Cự Giải" },
            { range: [[7, 23], [8, 22]], eng: "Leo", vie: "Sư Tử" },
            { range: [[8, 23], [9, 22]], eng: "Virgo", vie: "Xử Nữ" },
            { range: [[9, 23], [10, 23]], eng: "Libra", vie: "Thiên Bình" },
            { range: [[10, 24], [11, 22]], eng: "Scorpio", vie: "Thiên Yết" },
            { range: [[11, 23], [12, 21]], eng: "Sagittarius", vie: "Nhân Mã" }
        ];

        for (const zodiac of zodiacs) {
            const [[startM, startD], [endM, endD]] = zodiac.range;
            if ((month === startM && day >= startD) || (month === endM && day <= endD)) {
                return { eng: zodiac.eng, vie: zodiac.vie };
            }
        }

        return { eng: "Invalid date", vie: "Ngày không hợp lệ" };
    }
});
