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

// ---------------------------------------------------------------------------
// Download CTA — the three ways into Zira. Every channel exposes the SAME url
// through both a QR code and a button, so a scan and a click always land on
// the same place (and carry the same attribution).
// ---------------------------------------------------------------------------

export type DownloadChannelKey = "zalo" | "web" | "telegram";

export interface DownloadChannel {
  /** Picks the QR PNG from the `qrByKey` map in `DownloadCTA`. */
  key: DownloadChannelKey;
  /** Small uppercase caption above the QR code. */
  eyebrow: string;
  /** Visible label on the tile's link button. */
  action: string;
  /** Destination encoded in the QR code AND used as the button href. */
  href: string;
  /** Alt text describing what scanning this QR code does. */
  qrAlt: string;
}

export interface DownloadCtaCopy {
  heading: string;
  description: string;
  channels: DownloadChannel[];
}

export const downloadCta: DownloadCtaCopy = {
  heading: "Bắt đầu sử dụng Zira ngay",
  description:
    "Ba cách để mở Zira: trong Zalo Mini App, trên trình duyệt hoặc trong Telegram. Quét mã QR bằng điện thoại hoặc bấm vào liên kết bên dưới — tất cả đều miễn phí và không cần cài đặt.",
  channels: [
    {
      key: "zalo",
      eyebrow: "Zalo Mini App",
      action: "Mở trong Zalo",
      href: "https://zalo.me/s/483506872667069028/?utm_source=app-landing",
      qrAlt: "Mã QR quét bằng điện thoại để mở Zira Mini App trong Zalo",
    },
    {
      key: "web",
      eyebrow: "Trình duyệt web",
      action: "Mở zira.top/app",
      href: "https://zira.top/app/",
      qrAlt:
        "Mã QR quét bằng điện thoại để mở Zira trên trình duyệt tại zira.top/app",
    },
    {
      key: "telegram",
      eyebrow: "Telegram Mini App",
      action: "Mở trong Telegram",
      href: "https://t.me/ZiraSupportBot/zira",
      qrAlt: "Mã QR quét bằng điện thoại để mở Zira Mini App trong Telegram",
    },
  ],
};

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

// ---------------------------------------------------------------------------
// Legal pages (Privacy Policy + Terms of Service).
//
// NOTE: These are GOOD-FAITH DRAFTS covering the essentials (Nghị định
// 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân + app-store basics). They are a
// starting point and should be reviewed by legal counsel before being treated
// as binding. Update `lastUpdated` whenever the copy changes.
// ---------------------------------------------------------------------------

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  slug: "privacy" | "terms";
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  contactEmail: string;
}

const CONTACT_EMAIL = "hello@zira.top";
const LAST_UPDATED = "17/07/2026";

export const privacyPolicy: LegalDocument = {
  slug: "privacy",
  title: "Chính sách quyền riêng tư",
  lastUpdated: LAST_UPDATED,
  contactEmail: CONTACT_EMAIL,
  intro:
    "Zira tôn trọng quyền riêng tư của bạn. Chính sách này giải thích chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân của bạn như thế nào khi bạn dùng Zira trên Zalo Mini App, Telegram Mini App hoặc trình duyệt.",
  sections: [
    {
      heading: "1. Dữ liệu chúng tôi thu thập",
      paragraphs: [
        "Thông tin tài khoản: mã định danh từ nền tảng bạn đăng nhập (Zalo hoặc Telegram), tên hiển thị, ảnh đại diện và ngôn ngữ. Chúng tôi không lưu mật khẩu của bạn.",
        "Nội dung bạn tạo: dự án, nhiệm vụ, sprint, ghi chú, sự kiện lịch, bản vẽ, tệp đính kèm và bình luận.",
        "Dữ liệu sử dụng và thiết bị: các thao tác trong ứng dụng, loại thiết bị và múi giờ, được dùng để vận hành và cải thiện dịch vụ.",
      ],
    },
    {
      heading: "2. Cách chúng tôi sử dụng dữ liệu",
      paragraphs: [
        "Để cung cấp và duy trì dịch vụ: hiển thị công việc của bạn, gửi thông báo bạn đã bật, và đồng bộ giữa các nền tảng.",
        "Để cải thiện sản phẩm: hiểu tính năng nào hữu ích. Bạn có thể tắt việc thu thập dữ liệu phân tích trong phần cài đặt.",
        "Chúng tôi KHÔNG bán dữ liệu cá nhân của bạn cho bên thứ ba.",
      ],
    },
    {
      heading: "3. Chia sẻ dữ liệu",
      paragraphs: [
        "Trong nhóm của bạn: nội dung bạn tạo trong một dự án được chia sẻ với các thành viên của dự án đó.",
        "Nhà cung cấp hạ tầng: chúng tôi dùng dịch vụ lưu trữ và cơ sở dữ liệu để vận hành Zira; các bên này chỉ xử lý dữ liệu theo chỉ dẫn của chúng tôi.",
        "Nền tảng nhắn tin: khi bạn kết nối bot Zalo/Telegram, thông báo được gửi qua nền tảng tương ứng.",
      ],
    },
    {
      heading: "4. Lưu trữ và bảo mật",
      paragraphs: [
        "Dữ liệu được lưu trên máy chủ và được bảo vệ bằng các biện pháp kỹ thuật hợp lý. Kết nối được mã hoá qua HTTPS.",
        "Chúng tôi lưu dữ liệu của bạn trong thời gian tài khoản còn hoạt động và trong khoảng thời gian hợp lý sau đó để tuân thủ nghĩa vụ pháp lý.",
      ],
    },
    {
      heading: "5. Quyền của bạn",
      paragraphs: [
        "Truy cập và xuất dữ liệu: bạn có thể yêu cầu bản sao dữ liệu cá nhân của mình.",
        "Chỉnh sửa: bạn có thể cập nhật thông tin hồ sơ trong ứng dụng.",
        "Xoá tài khoản: bạn có thể yêu cầu xoá tài khoản và dữ liệu cá nhân liên quan.",
        "Rút lại đồng ý: bạn có thể tắt phân tích hoặc ngắt kết nối bot bất cứ lúc nào.",
      ],
    },
    {
      heading: "6. Trẻ em",
      paragraphs: [
        "Zira không hướng đến trẻ em dưới độ tuổi tối thiểu theo quy định. Nếu bạn cho rằng một trẻ em đã cung cấp dữ liệu cho chúng tôi, vui lòng liên hệ để chúng tôi xử lý.",
      ],
    },
    {
      heading: "7. Thay đổi chính sách",
      paragraphs: [
        "Chúng tôi có thể cập nhật chính sách này. Bản mới nhất luôn được đăng tại trang này kèm ngày cập nhật.",
      ],
    },
    {
      heading: "8. Liên hệ",
      paragraphs: [
        `Mọi câu hỏi hoặc yêu cầu về dữ liệu cá nhân, vui lòng liên hệ ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  slug: "terms",
  title: "Điều khoản sử dụng",
  lastUpdated: LAST_UPDATED,
  contactEmail: CONTACT_EMAIL,
  intro:
    "Bằng việc sử dụng Zira, bạn đồng ý với các điều khoản dưới đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.",
  sections: [
    {
      heading: "1. Chấp nhận điều khoản",
      paragraphs: [
        "Khi bạn truy cập hoặc sử dụng Zira, bạn đồng ý bị ràng buộc bởi các điều khoản này và Chính sách quyền riêng tư của chúng tôi. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ.",
      ],
    },
    {
      heading: "2. Mô tả dịch vụ",
      paragraphs: [
        "Zira là công cụ quản lý công việc, dự án và nhóm, dùng trên Zalo Mini App, Telegram Mini App và trình duyệt. Chúng tôi có thể thay đổi hoặc ngừng một số tính năng theo thời gian.",
      ],
    },
    {
      heading: "3. Tài khoản của bạn",
      paragraphs: [
        "Bạn đăng nhập qua nền tảng bên thứ ba (Zalo/Telegram) và chịu trách nhiệm về hoạt động trong tài khoản của mình.",
        "Bạn đồng ý cung cấp thông tin chính xác và giữ an toàn cho tài khoản.",
      ],
    },
    {
      heading: "4. Sử dụng hợp lệ",
      paragraphs: [
        "Bạn không được dùng Zira cho mục đích bất hợp pháp, phát tán nội dung độc hại, xâm phạm quyền của người khác, hoặc gây gián đoạn dịch vụ.",
        "Bạn giữ quyền sở hữu đối với nội dung mình tạo ra và chịu trách nhiệm về nội dung đó.",
      ],
    },
    {
      heading: "5. Sở hữu trí tuệ",
      paragraphs: [
        "Zira và các thành phần của dịch vụ (trừ nội dung do người dùng tạo) thuộc sở hữu của chúng tôi và được pháp luật bảo hộ.",
      ],
    },
    {
      heading: "6. Miễn trừ và giới hạn trách nhiệm",
      paragraphs: [
        'Dịch vụ được cung cấp "nguyên trạng". Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm cho các thiệt hại gián tiếp phát sinh từ việc sử dụng dịch vụ.',
        "Bạn nên tự sao lưu những dữ liệu quan trọng.",
      ],
    },
    {
      heading: "7. Chấm dứt",
      paragraphs: [
        "Bạn có thể ngừng sử dụng và xoá tài khoản bất cứ lúc nào. Chúng tôi có thể tạm ngừng hoặc chấm dứt quyền truy cập nếu bạn vi phạm các điều khoản này.",
      ],
    },
    {
      heading: "8. Luật áp dụng",
      paragraphs: [
        "Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam.",
      ],
    },
    {
      heading: "9. Liên hệ",
      paragraphs: [
        `Mọi câu hỏi về điều khoản, vui lòng liên hệ ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};
