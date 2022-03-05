const stylesArr = [
    {
        styles: {
            color: "#707070",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Dân thường",
        description: "Người bình thường hay còn gọi là phế vật :)",
    },
    {
        styles: {
            color: "black",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Luyện khí",
        description:
            "Đây là giai đoạn người tu luyện  sẽ chắt lọc tinh hoa trong thiên địa hấp thu vào cơ thể tồn tại trong đan điền dưới dạng khí. Luyện Khí kỳ là giai đoạn cơ bản có hầu hết trong các truyện tu chân nói chung.Các tu sĩ luyện khí kỳ sẽ tu luyện công pháp quyết trụ cột cơ bản chia ra 5 thuộc tính ngũ hành bao gồm 13 tầng.",
    },
    {
        styles: {
            color: "#39CCCC",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Trúc cơ",
        description:
            "Được ví như giai đoạn chuẩn bị để có thể tích trữ khí vào trong cơ thể. Trúc Cơ đúng như tên gọi có nghĩa cấu trúc lại cơ thể, bồi đắp cho thân thể cứng cáp để có thể chịu được các luồng khí nguyên tố có đặc tính riêng: Nóng, lạnh, nặng nề, sắc bén.Trong truyện thì hầu hết các tu tiên giả tiến cấp Trúc Cơ đều sử dụng Trúc Cơ Đan. Đây cũng là cách mà Hàn Lập tiến cấp Trúc Cơ thành công tại địa hỏa chi ốc bằng cách chế ra cơ số Trúc Cơ đan.",
    },
    {
        styles: {
            color: "#EA9A62",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Kết đan",
        description:
            "Khí trong đan điền dần ngưng tụ như nước dịch rồi trở thành thể rắn, đan điền kiết xuất ra một viên kim đan. Đối với nhiều bộ truyện khác thì giữa trúc cơ và kết đan còn có một kỳ nữa gọi là ngưng nguyên tượng trưng cho 3 thể khí – lỏng – rắn. Kim Đan ban đầu chỉ nhỏ như hạt bụi tuy nhiên theo thời gian sẽ càng lớn dần.Với yêu thú, kim đan có tên gọi yêu hạch hay tinh hạch còn đối với các loài thần thú như Rồng thì Kim Đan được gọi là Long Châu.",
    },
    {
        styles: {
            color: "#5c3c92",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Nguyên Anh",
        description:
            "Đây là quá trình tôi luyện Kim Đan tạo thành phôi thai dùng tín niệm để gọt rũa, rèn Kim Đan để sau đó tạo thành phôi thai có đặc tính riêng. Thông thường với đạo gia chính tông sẽ luyện Nguyên Anh thành hình dạng đứa trẻ nhỏ xíu nhưng có thần thông kinh người.Ngoài ra thì Nguyên Anh có thể tu luyện thành hình Kiếm, Thái Dương, Bảo Tháp hay hình rồng, mãng xà. Với yêu thú tới giai đoạn này có thể luyện thành 9 đuôi hoặc mọc sừng lớn, hình hài con người. Đây chính là lý giải cho việc yêu quái trong các bộ truyện có thể biến hình qua lại đó chính là hình ảnh của Nguyên Anh chứ nguyên hình của chúng thực sự vẫn không hề thay đổi.",
    },
    {
        styles: {
            color: "#c66b3d",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Hóa Thần",
        description:
            "Là giai đoạn cho phép người tu luyện cảm ứng được thiên địa nguyên khí. Tuy nhiên tại Hóa Thần Kỳ ngoài cảm ứng ra không thể tác động đến thiên địa nguyên khí. Nguyên Anh đến cảnh giới này có khả năng tàng hình.",
    },
    {
        styles: {
            color: "#d902ee",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Luyện Hư",
        description:
            "Người tu có thể cảm ứng thiên địa nguyên khí rõ ràng hơn giai đoạn hóa thần. Ở giai đoạn này thì người tu tiên sẽ phải hợp ngũ hành linh căn mới có thể tiến giai được. Luyện Hư là giai đoạn đầu của trung cảnh giới thế nên cách thức chủ yếu là rèn luyện tương tự như luyện Kim Đan tuy nhiên chỉ khác là sự biển đổi của linh hồn, tinh thần.",
    },
    {
        styles: {
            color: "#3a6b35",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Hợp thể",
        description:
            "Cảnh giới này hợp nhất được nguyên anh, thần thức, công lực của người tu hành thành một pháp tướng, có uy lực mạnh mẽ. Nhưng thường hao tổn linh lực nên chỉ được coi là sát chiêu cuối cùng.",
    },
    {
        styles: {
            color: "#05716c",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Đại thừa",
        description:
            "Ở cảnh giới này, người tu hành đã dần chuyển sang việc hiểu sâu đạo lý và quy luật phát triển của thế giới. Hay nói ngắn gọn hơn là tìm hiểu thiên địa phép tắc để có thể hiểu rõ nhân quả và chuyển xoay thiên địa.Giai đoạn này trong truyện, Hàn Lập vừa tiến giai Đại Thừa đã xuất khiếu Nguyên Anh thần tu vạn dặm.",
    },
    {
        styles: {
            color: "#f57e7e",
            fontSize: 20,
            fontFamily: "Boogaloo_400Regular",
        },
        levelName: "Độ kiếp",
        description:
            "Là cảnh giới tiếp theo sau Đại Thừa Kỳ. Độ Kiếp thành công được ví như cá chép vượt vũ môn, trở nên mạnh mẽ và cảm ngộ sâu hơn thiên địa phép tắc so với Đại Thừa Kỳ. Giai đoạn này, người tu hành sẽ phải chịu lôi kiếp.",
    },
    {
        children: [
            {
                styles: {
                    color: "#FF0000",
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Boogaloo_400Regular",
                },
                levelName: "T",
            },
            {
                styles: {
                    color: "#FF8E00",
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Boogaloo_400Regular",
                },
                levelName: "i",
            },
            {
                styles: {
                    color: "#400098",
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Boogaloo_400Regular",
                },
                levelName: "ê",
            },
            {
                styles: {
                    color: "#8E008E",
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Boogaloo_400Regular",
                },
                levelName: "n",
            },
            {
                styles: {
                    color: "#00C0C0",
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Boogaloo_400Regular",
                    marginLeft: 5,
                },
                levelName: "Đ",
            },
            {
                styles: {
                    color: "#008E00",
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Boogaloo_400Regular",
                },
                levelName: "ế",
            },
        ],
        description:
            "Dung hợp đại đạo, kế thừa đại đạo, nắm giữ pháp tắc của bản thân, trực tiếp bước trên con đường hóa thân thành đại đạo",
    },
];

const getLevel = (level) => {
    var count = 0;
    if (level > 256) {
        return {
            styleLevel: 10,
            exp: level,
        };
    } else {
        for (var i = 512; i >= 1; i = i / 2) {
            count++;
            if (level <= i && level >= i / 2) {
                break;
            }
        }
        return {
            styleLevel: 10 - count,
            exp: i,
        };
    }
};

const handleStyleTextLevel = (exp) => {
    const conversionExperience = Math.abs(exp) / 3600;
    const currentLevel = getLevel(Math.abs(conversionExperience));
    const percentExp = (conversionExperience * 100) / currentLevel.exp;
    return {
        stylesLevel: { ...stylesArr[currentLevel.styleLevel] },
        exp: Math.floor(percentExp) > 100 ? 100 : Math.floor(percentExp),
    };
};
export { stylesArr, handleStyleTextLevel };
