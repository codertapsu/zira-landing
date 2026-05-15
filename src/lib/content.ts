export const navLinks = [
  { label: "Tính năng", href: "#how-it-works" },
  { label: "Công cụ", href: "#ready-to-ride" },
  { label: "Giao diện", href: "#feature-tour" },
  { label: "Mở Mini App", href: "#download" },
] as const;

export interface FeatureItem {
  number: string;
  title: string;
  description: string;
  icon?: "mail" | "building" | "car";
}

export const howItWorksFeatures: FeatureItem[] = [
  {
    number: "1",
    title: "Quản lý dự án rõ ràng",
    description:
      "Tạo dự án, chia nhỏ thành sprint và nhiệm vụ. Mọi tiến độ luôn nằm trong tầm tay.",
  },
  {
    number: "2",
    title: "Theo dõi nhiệm vụ chi tiết",
    description:
      "Giao việc, đặt hạn, thêm bình luận. Cập nhật trạng thái nhanh chỉ bằng một chạm.",
  },
  {
    number: "3",
    title: "Lịch & sự kiện cá nhân",
    description:
      "Lên lịch họp, nghỉ phép, nhắc việc. Mọi sự kiện đồng bộ ngay trên di động.",
  },
  {
    number: "4",
    title: "Ghi chú & báo cáo",
    description:
      "Ghi chú họp, retro nhóm và xuất báo cáo tiến độ trực quan trong vài giây.",
  },
];

export const readyToRideFeatures: FeatureItem[] = [
  {
    number: "01",
    title: "Cộng tác nhóm tức thì",
    description:
      "Mời đồng đội, phân quyền, cùng nhau cập nhật công việc theo thời gian thực.",
    icon: "mail",
  },
  {
    number: "02",
    title: "Bản vẽ và sơ đồ trực quan",
    description:
      "Phác thảo ý tưởng bằng bản vẽ Excalidraw đa người, lưu và chia sẻ tức thì.",
    icon: "building",
  },
  {
    number: "03",
    title: "Đồng bộ trên mọi thiết bị",
    description:
      "Dùng trên điện thoại trong Zalo Mini App hoặc mở trên trình duyệt — dữ liệu luôn thống nhất.",
    icon: "car",
  },
];

export interface FeatureTourSlide {
  title: string;
  description: string;
  imageKey: string;
  alt: string;
}

export const featureTour: FeatureTourSlide[] = [
  {
    title: "Trang chủ — tổng quan công việc hôm nay",
    description:
      "Mở Zira là thấy ngay nhiệm vụ ưu tiên, dự án đang chạy và lịch sắp tới — không cần lục tìm.",
    imageKey: "001",
    alt: "Trang chủ Zira hiển thị tổng quan công việc của người dùng",
  },
  {
    title: "Bắt đầu nhanh chỉ với một chạm",
    description:
      "Người dùng Zalo mới mở Zira lần đầu thấy hướng dẫn rõ ràng và có thể tạo công việc trong vài giây.",
    imageKey: "002",
    alt: "Màn hình chào mừng Zira dành cho người dùng khách trên Zalo Mini App",
  },
  {
    title: "Quản lý dự án rõ ràng từng giai đoạn",
    description:
      "Mỗi dự án có sprint, danh sách nhiệm vụ, thành viên và tiến độ. Mọi thông tin gọn trong một màn hình.",
    imageKey: "003",
    alt: "Trang chi tiết dự án trong Zira với danh sách nhiệm vụ và tiến độ sprint",
  },
  {
    title: "Theo dõi nhiệm vụ tới từng chi tiết",
    description:
      "Xem mô tả, người được giao, hạn chót, bình luận và đính kèm trong một nhiệm vụ duy nhất.",
    imageKey: "004",
    alt: "Trang chi tiết nhiệm vụ Zira với mô tả, người được giao và bình luận",
  },
  {
    title: "Báo cáo dự án trực quan",
    description:
      "Biểu đồ tiến độ, sprint còn lại và phân bổ công việc — đủ dữ liệu cho cuộc họp tuần.",
    imageKey: "005",
    alt: "Trang kết quả báo cáo dự án Zira với biểu đồ tiến độ",
  },
  {
    title: "Lịch và sự kiện gọn trong một nơi",
    description:
      "Họp, nghỉ phép, nhắc việc, sự kiện lặp lại — Zira đồng bộ múi giờ và nhắc đúng lúc.",
    imageKey: "006",
    alt: "Trang lịch Zira với sự kiện và lịch họp trong tuần",
  },
  {
    title: "Cá nhân hoá theo cách bạn làm việc",
    description:
      "Đặt chủ đề sáng/tối, ngôn ngữ, múi giờ và định dạng thời gian quen thuộc với bạn.",
    imageKey: "007",
    alt: "Trang cài đặt trong ứng dụng Zira với các tuỳ chọn giao diện và ngôn ngữ",
  },
  {
    title: "Kiểm soát thông báo, không bị quấy rầy",
    description:
      "Chọn loại thông báo nhận được trong Zalo, qua bot Zalo OA, email — và đặt giờ yên tĩnh.",
    imageKey: "008",
    alt: "Trang cài đặt thông báo Zira với các kênh và giờ yên tĩnh",
  },
  {
    title: "Bản vẽ Excalidraw cộng tác nhiều người",
    description:
      "Phác thảo flow, sơ đồ, mockup ngay trên di động và chia sẻ ngay với cả nhóm.",
    imageKey: "009",
    alt: "Trang bản vẽ Excalidraw Zira hỗ trợ cộng tác thời gian thực",
  },
  {
    title: "Thư mục thông minh, gom việc theo bộ lọc",
    description:
      "Tạo thư mục lọc theo trạng thái, độ ưu tiên, hạn chót — mở ra thấy đúng việc cần làm.",
    imageKey: "010",
    alt: "Trang tạo thư mục thông minh Zira với bộ lọc nhiệm vụ",
  },
  {
    title: "Trung tâm thông báo trong ứng dụng",
    description:
      "Mọi tương tác — bình luận, được mời, được giao việc — hiện ra ở một nơi duy nhất.",
    imageKey: "011",
    alt: "Trang danh sách thông báo trong ứng dụng Zira",
  },
  {
    title: "Tập trung vào việc của hôm nay",
    description:
      "Today Focus đề xuất nhiệm vụ cần xử lý hôm nay, dựa trên độ ưu tiên và hạn chót.",
    imageKey: "012",
    alt: "Trang Today Focus của Zira đề xuất công việc quan trọng trong ngày",
  },
  {
    title: "Báo cáo cá nhân theo tuần & tháng",
    description:
      "Theo dõi số nhiệm vụ đã hoàn thành, thời gian dành cho mỗi dự án và xu hướng làm việc.",
    imageKey: "013",
    alt: "Trang kết quả báo cáo cá nhân của người dùng Zira",
  },
  {
    title: "Hướng dẫn sử dụng từng bước",
    description:
      "Người dùng mới có ngay hướng dẫn nhanh để khám phá tính năng quan trọng nhất.",
    imageKey: "014",
    alt: "Trang hướng dẫn sử dụng Zira dành cho người dùng mới",
  },
  {
    title: "Quản lý hạn chót & dòng thời gian",
    description:
      "Nhìn tổng thể những việc sắp tới hạn, lên kế hoạch sớm và tránh trễ deadline.",
    imageKey: "015",
    alt: "Trang quản lý hạn chót và dòng thời gian dự án trong Zira",
  },
];

export type TestimonialAccent =
  | "amber"
  | "peach"
  | "rose"
  | "sage"
  | "sky"
  | "lilac";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: TestimonialAccent;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Zira giúp đội tôi gom mọi việc về một chỗ. Không cần nhảy giữa các app, mọi cập nhật đều ngay trong Zalo.",
    name: "Hoàng Anh",
    role: "Trưởng nhóm marketing",
    initials: "HA",
    accent: "amber",
    rating: 5,
  },
  {
    quote:
      "Giao việc, đặt hạn rồi báo cáo cuối tuần — xong trong vài phút. Đội nhỏ như nhóm tôi cần đúng thế này.",
    name: "Minh Trang",
    role: "Quản lý dự án",
    initials: "MT",
    accent: "peach",
    rating: 5,
  },
  {
    quote:
      "Tôi thích bản vẽ Excalidraw cộng tác. Họp ý tưởng online vẫn vẽ chung được, lưu lại đầy đủ.",
    name: "Quốc Bảo",
    role: "Thiết kế sản phẩm",
    initials: "QB",
    accent: "rose",
    rating: 5,
  },
  {
    quote:
      "Mở Mini App là thấy ngay việc cần làm hôm nay. Đỡ hẳn cảm giác bị ngợp lúc sáng sớm.",
    name: "Phương Linh",
    role: "Chuyên viên vận hành",
    initials: "PL",
    accent: "sage",
    rating: 5,
  },
  {
    quote:
      "Thông báo qua Zalo bot rất tiện. Tôi luôn biết ai vừa giao gì cho mình mà không cần mở thêm app.",
    name: "Đức Tài",
    role: "Trưởng nhóm kỹ thuật",
    initials: "ĐT",
    accent: "sky",
    rating: 4,
  },
  {
    quote:
      "Giao diện sạch, dễ dùng. Ngay cả thành viên ít tiếp xúc với phần mềm quản lý cũng vào việc rất nhanh.",
    name: "Thu Hà",
    role: "Quản lý vận hành",
    initials: "TH",
    accent: "lilac",
    rating: 5,
  },
];
