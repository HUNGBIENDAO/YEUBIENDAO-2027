import { DayEvent, MonthlyThemeData, IslandLocation } from '../types/calendar';

export const HERO_IMAGE = '/src/assets/images/teen_bien_dao_hero_1793777462372.jpg';
export const TRUONG_SA_IMAGE = '/src/assets/images/truong_sa_island_patrol_1793777463059.jpg';
export const DK1_IMAGE = '/src/assets/images/dk1_platform_marine_1793777464366.jpg';
export const LY_SON_IMAGE = '/src/assets/images/ly_son_volcanic_coast_1793777462134.jpg';

export const FIXED_DAY_EVENTS_2027: Record<string, DayEvent[]> = {
  // Late 2026
  '2026-11-20': [
    { id: 'fx-2026-11-20', title: 'Ngày Nhà giáo Việt Nam 20/11', category: 'school', description: 'Tri ân thầy cô giáo cả nước và thầy cô gieo chữ trên các đảo tiền tiêu.' },
  ],
  '2026-12-22': [
    { id: 'fx-2026-12-22', title: 'Ngày thành lập QĐND Việt Nam', category: 'island', description: 'Ngày hội Quốc phòng toàn dân - Vững vàng biển đảo Tổ quốc.' },
  ],

  // 2027
  '2027-01-01': [
    { id: 'fx-01-01', title: 'Tết Dương Lịch 2027', category: 'national', description: 'Chào năm mới 2027' },
  ],
  '2027-01-09': [
    { id: 'fx-01-09', title: 'Ngày Truyền thống Học sinh - Sinh viên', category: 'youth', description: 'Noi gương Anh hùng Trần Văn Ơn - Tuổi trẻ học tập vì biển đảo quê hương.' },
  ],
  '2027-01-11': [
    { id: 'fx-01-11', title: 'Chuyên đề: Địa lý Biển Đảo Đông Bắc', category: 'school', description: 'Tiết học tích hợp GD địa phương về Vịnh Bắc Bộ và đảo Cô Tô.' },
  ],
  '2027-02-03': [
    { id: 'fx-02-03', title: 'Ngày thành lập Đảng CSVN', category: 'national', description: '97 năm ngày thành lập Đảng Cộng sản Việt Nam (03/02/1930).' },
  ],
  '2027-02-05': [
    { id: 'fx-02-05', title: '29 Tết - Đêm Giao Thừa Đinh Mùi', category: 'traditional', description: 'Đón giao thương và ấm tình chiến sĩ biên cương hải đảo.' },
  ],
  '2027-02-06': [
    { id: 'fx-02-06', title: 'Mùng 1 Tết Nguyên Đán Đinh Mùi', category: 'traditional', description: 'Tết cổ truyền dân tộc - Mùa xuân trên đất liền và hải đảo xa xôi.' },
  ],
  '2027-02-07': [
    { id: 'fx-02-07', title: 'Mùng 2 Tết Nguyên Đán', category: 'traditional', description: 'Xuân ấm áp muôn nhà.' },
  ],
  '2027-02-08': [
    { id: 'fx-02-08', title: 'Mùng 3 Tết Nguyên Đán', category: 'traditional', description: 'Tết thầy cô, bè bạn.' },
  ],
  '2027-02-27': [
    { id: 'fx-02-27', title: 'Ngày Thầy thuốc Việt Nam', category: 'national', description: 'Tri ân đội ngũ quân y kiên cường chăm sóc sức khỏe quân dân trên đảo.' },
  ],
  '2027-03-08': [
    { id: 'fx-03-08', title: 'Ngày Quốc tế Phụ nữ 8/3', category: 'national', description: 'Tôn vinh người phụ nữ Việt Nam và hậu phương vững chắc người lính biển.' },
  ],
  '2027-03-14': [
    { id: 'fx-03-14', title: 'Tưởng niệm 64 Liệt sĩ Gạc Ma (1988)', category: 'island', description: 'Khắc ghi "Vòng tròn bất tử" tại quần đảo Trường Sa.' },
  ],
  '2027-03-26': [
    { id: 'fx-03-26', title: 'Ngày thành lập Đoàn TNCS HCM', category: 'youth', description: '96 năm Đoàn TNCS Hồ Chí Minh - Tháng thanh niên vì biển đảo quê hương.' },
  ],
  '2027-04-16': [
    { id: 'fx-04-16', title: 'Giỗ Tổ Hùng Vương (10/3 Âm lịch)', category: 'traditional', description: 'Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba.' },
  ],
  '2027-04-30': [
    { id: 'fx-04-30', title: 'Giải phóng miền Nam, Thống nhất Đất nước', category: 'national', description: '52 năm ngày non sông thu về một mối, giải phóng các đảo thuộc Trường Sa.' },
  ],
  '2027-05-01': [
    { id: 'fx-05-01', title: 'Ngày Quốc tế Lao động', category: 'national', description: 'Tôn vinh tinh thần lao động kiến thiết đất nước.' },
  ],
  '2027-05-07': [
    { id: 'fx-05-07', title: 'Ngày thành lập Hải quân Nhân dân Việt Nam', category: 'island', description: '72 năm ngày truyền thống Hải quân NDVN (07/05/1955).' },
  ],
  '2027-05-15': [
    { id: 'fx-05-15', title: 'Ngày thành lập Đội TNTP Hồ Chí Minh', category: 'youth', description: '86 năm Đội TNTP Hồ Chí Minh - Em yêu biển đảo Tổ quốc.' },
  ],
  '2027-05-19': [
    { id: 'fx-05-19', title: 'Kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh', category: 'national', description: 'Nhớ lời dạy của Bác: "Ngày trước ta chỉ có đêm và rừng. Ngày nay ta có ngày, có trời, có biển...".' },
  ],
  '2027-06-01': [
    { id: 'fx-06-01', title: 'Ngày Quốc tế Thiếu nhi 1/6', category: 'youth', description: 'Gửi yêu thương và sách vở đến các em học sinh trên xã đảo Trường Sa, Song Tử Tây.' },
  ],
  '2027-06-05': [
    { id: 'fx-06-05', title: 'Ngày Môi trường Thế giới', category: 'national', description: 'Hành động chống rác thải nhựa đại dương.' },
  ],
  '2027-06-08': [
    { id: 'fx-06-08', title: 'Ngày Đại dương Thế giới & Tuần lễ Biển Đảo VN', category: 'island', description: 'Tuần lễ Biển và Hải đảo Việt Nam.' },
  ],
  '2027-06-21': [
    { id: 'fx-06-21', title: 'Ngày Báo chí Cách mạng Việt Nam', category: 'national', description: 'Những cây bút đồng hành cùng chiến sĩ và ngư dân vươn khơi bám biển.' },
  ],
  '2027-07-05': [
    { id: 'fx-07-05', title: 'Kỷ niệm thành lập Nhà giàn DK1 (1989)', category: 'island', description: '38 năm ngày thành lập Cụm Dịch vụ - Kinh tế - Khoa học - Kỹ thuật DK1.' },
  ],
  '2027-07-27': [
    { id: 'fx-07-27', title: 'Ngày Thương binh - Liệt sĩ', category: 'national', description: 'Đời đời nhớ ơn các anh hùng liệt sĩ đã ngã xuống vì độc lập và chủ quyền biển đảo.' },
  ],
  '2027-08-19': [
    { id: 'fx-08-19', title: 'Cách mạng Tháng Tám thành công', category: 'national', description: '82 năm Cách mạng Tháng Tám hào hùng.' },
  ],
  '2027-09-02': [
    { id: 'fx-09-02', title: 'Quốc khánh Nước CHXHCN Việt Nam', category: 'national', description: 'Tết Độc lập - Tự hào non sông gấm vóc liền một dải từ đất liền đến hải đảo.' },
  ],
  '2027-09-24': [
    { id: 'fx-09-24', title: 'Tết Trung Thu (15/8 Âm lịch)', category: 'youth', description: 'Đêm hội trăng rằm, tiếng trống lân rộn rã nơi các điểm trường trên đảo.' },
  ],
  '2027-10-10': [
    { id: 'fx-10-10', title: 'Giải phóng Thủ đô Hà Nội', category: 'national', description: 'Hà Nội vì cả nước, cả nước vì Trường Sa, Hoàng Sa thân yêu.' },
  ],
  '2027-10-15': [
    { id: 'fx-10-15', title: 'Ngày truyền thống Hội LHTN Việt Nam', category: 'youth', description: 'Thanh niên Việt Nam xung kích vì biển đảo quê hương.' },
  ],
  '2027-10-20': [
    { id: 'fx-10-20', title: 'Ngày Phụ nữ Việt Nam 20/10', category: 'national', description: 'Tôn vinh người mẹ, người cô, nữ chiến sĩ trên mọi miền đất nước.' },
  ],
  '2027-10-23': [
    { id: 'fx-10-23', title: 'Ngày mở đường Hồ Chí Minh trên biển (1961)', category: 'island', description: 'Kỷ niệm huyền thoại Đoàn tàu Không số quả cảm.' },
  ],
  '2027-11-20': [
    { id: 'fx-11-20', title: 'Ngày Nhà giáo Việt Nam 20/11', category: 'school', description: 'Tri ân thầy cô giáo - Đặc biệt thầy cô cống hiến nơi xã đảo tiền tiêu xa xôi.' },
  ],
  '2027-12-22': [
    { id: 'fx-12-22', title: 'Ngày thành lập QĐND Việt Nam', category: 'island', description: '83 năm ngày thành lập Quân đội Nhân dân Việt Nam & Ngày hội Quốc phòng Toàn dân.' },
  ],
};

export const MONTH_THEMES_DATA: MonthlyThemeData[] = [
  {
    month: 1,
    islandName: 'Quần đảo Trường Sa',
    archipelago: 'Huyện đảo Trường Sa',
    province: 'Tỉnh Khánh Hòa',
    coordinates: '8°38′30″B 111°55′55″Đ',
    title: 'Trường Sa - Tuyến Đầu Đón Bình Minh Tổ Quốc',
    mottoQuote: 'Nơi đầu sóng ngọn gió, lá cờ đỏ sao vàng luôn tung bay kiêu hãnh trong nắng sớm.',
    authorQuote: 'Khẩu hiệu chiến sĩ Trường Sa',
    image: TRUONG_SA_IMAGE,
    story: 'Quần đảo Trường Sa gồm hơn 100 hòn đảo, bãi đá ngầm, cồn cát. Nơi đây có trường học rộn rã tiếng đọc bài của các em nhỏ, có chùa chiền với tiếng chuông ngân bình yên và những người lính trẻ ngày đêm canh giữ vùng trời vùng biển thiêng liêng.',
    teachingPrompt: 'Tích hợp môn Địa lý & Lịch sử lớp 8-9: Phân tích vị trí chiến lược của quần đảo Trường Sa trên tuyến hàng hải quốc tế Biển Đông.',
    biodiversity: [
      { name: 'Cây Bàng Vuông', description: 'Biểu tượng sức sống kiên cường giữa nắng gió và hơi mặn biển khơi' },
      { name: 'Cây Phong Ba', description: 'Cây chắn sóng, rễ bám sâu vào san hô chống chọi cuồng phong' },
      { name: 'San hô sừng hươu', description: 'Hệ rạn san hô đa sắc màu che chở muôn loài sinh vật biển' },
    ],
    historicalHighlight: {
      year: '1975 - Nay',
      event: 'Bộ đội Hải quân nhân dân Việt Nam tiếp quản và kiên cường bảo vệ vững chắc chủ quyền quần đảo Trường Sa.',
    },
  },
  {
    month: 2,
    islandName: 'Quần đảo Hoàng Sa',
    archipelago: 'Huyện Hoàng Sa',
    province: 'Thành phố Đà Nẵng',
    coordinates: '16°30′B 112°00′Đ',
    title: 'Hoàng Sa - Vọng Mãi Khúc Tráng Ca Hùng Binh',
    mottoQuote: 'Hoàng Sa trời nước mênh mông / Người đi thì có mà không thấy về...',
    authorQuote: 'Ca dao Hùng binh Hoàng Sa',
    image: TRUONG_SA_IMAGE,
    story: 'Từ thời các chúa Nguyễn, những người lính Hùng binh Hoàng Sa giong buồm trên những chiếc thuyền câu bé nhỏ vượt sóng dữ đo đạc hải trình, thu lượm hải vật. Lễ Khao lề thế lính Hoàng Sa tại đảo Lý Sơn vẫn được gìn giữ ngàn đời như một di sản bất tử.',
    teachingPrompt: 'Tích hợp Giáo dục Địa phương TP. Đà Nẵng: Tìm hiểu về Nhà trưng bày Hoàng Sa và tư liệu châu bản triều Nguyễn.',
    biodiversity: [
      { name: 'Hải sâm & Ốc tai tượng', description: 'Nguồn lợi thủy sản quý giá từ hàng trăm năm trước của cư dân Việt' },
      { name: 'Chim Hải Âu & Nhạn biển', description: 'Đàn chim biển chao liệng trên các đảo san hô cát trắng muốt' },
    ],
    historicalHighlight: {
      year: 'Thế kỷ XVII - Nguyễn Triều',
      event: 'Chúa Nguyễn và các vua triều Nguyễn lập Hải đội Hoàng Sa kiêm quản Bắc Hải hàng năm ra đo đạc, cắm mốc chủ quyền.',
    },
  },
  {
    month: 3,
    islandName: 'Nhà giàn DK1',
    archipelago: 'Thềm lục địa phía Nam',
    province: 'Bà Rịa - Vũng Tàu',
    coordinates: '7°00′B 109°00′Đ',
    title: 'Nhà Giàn DK1 - Pháo Đài Thép Giữa Trùng Khơi',
    mottoQuote: 'Dưới chân là vực thẳm sóng gầm, trên đầu là Tổ quốc thiêng liêng.',
    authorQuote: 'Kỷ niệm chiến sĩ Nhà giàn DK1',
    image: DK1_IMAGE,
    story: 'Được dựng kiên cố trên các bãi cọc ngầm giữa biển khơi sâu thẳm, các Nhà giàn DK1 sừng sững như những cột mốc chủ quyền bằng thép. Dù bão gió khắc nghiệt đến đâu, lá cờ đỏ sao vàng vẫn luôn phấp phới trên nóc giàn.',
    teachingPrompt: 'Tích hợp GDCD & Hoạt động trải nghiệm: Ý thức trách nhiệm của tuổi trẻ đối với vùng đặc quyền kinh tế và thềm lục địa.',
    biodiversity: [
      { name: 'Cá Chuồn biển & Cá Thu', description: 'Những đàn cá bay vút trên ngọn sóng quanh chân cọc giàn khoan' },
      { name: 'Vườn rau chiến sĩ', description: 'Rau xanh trồng trong khay xốp chắt chiu từng giọt nước ngọt mưa rào' },
    ],
    historicalHighlight: {
      year: '1989',
      event: 'Chủ tịch Hội đồng Bộ trưởng ra chỉ thị xây dựng Cụm Dịch vụ - Kinh tế - Khoa học - Kỹ thuật DK1.',
    },
  },
  {
    month: 4,
    islandName: 'Đảo Lý Sơn',
    archipelago: 'Huyện đảo Lý Sơn',
    province: 'Tỉnh Quảng Ngãi',
    coordinates: '15°22′B 109°07′Đ',
    title: 'Lý Sơn - Miền Trầm Tích Núi Lửa & Quê Hương Hùng Binh',
    mottoQuote: 'Nơi đá núi triệu năm ôm lấy sóng, nơi những cánh đồng tỏi ngạt ngào hương biển.',
    authorQuote: 'Nhật ký hành trình Teen',
    image: LY_SON_IMAGE,
    story: 'Lý Sơn hình thành từ tàn tích của 5 ngọn núi lửa đã tắt cách đây hàng triệu năm. Hòn đảo tựa như một bảo tàng địa chất ngoài trời kỳ vĩ với Cổng Tò Vò, Hang Câu và những cánh đồng hành tỏi bậc thang xanh mát mắt.',
    teachingPrompt: 'Tích hợp môn Địa lý lớp 8: Hiện tượng phun trào núi lửa và hình thành các dạng địa hình trầm tích bờ biển.',
    biodiversity: [
      { name: 'Tỏi cô đơn Lý Sơn', description: 'Đặc sản nức tiếng trồng trên lớp đất cát biển pha đá bazan núi lửa' },
      { name: 'Rau câu chân vịt', description: 'Món quà dinh dưỡng quý giá từ rạn đá ven bờ biển Đảo Bé' },
    ],
    historicalHighlight: {
      year: 'Hàng năm (tháng 3-4 Âm lịch)',
      event: 'Lễ hội Khao lề thế lính Hoàng Sa diễn ra tại đình làng An Vĩnh tri ân tiền nhân.',
    },
  },
  {
    month: 5,
    islandName: 'Phú Quốc & Thổ Chu',
    archipelago: 'Quần đảo Nam Du - Thổ Chu',
    province: 'Tỉnh Kiên Giang',
    coordinates: '10°13′B 103°58′Đ',
    title: 'Phú Quốc & Thổ Chu - Viên Ngọc Xanh Biển Tây Nam',
    mottoQuote: 'Biển biếc trời trong sóng ru bờ cát, ngọc trai lấp lánh dệt sắc nắng hè.',
    authorQuote: 'Khát vọng biển Tây Nam',
    image: LY_SON_IMAGE,
    story: 'Phú Quốc là hòn đảo lớn nhất Việt Nam, nơi có những cánh rừng nguyên sinh bạt ngàn tiếp giáp biển ngọc. Cùng với quần đảo tiền tiêu Thổ Chu cách xa đất liền hơn 100km, nơi đây canh giữ cửa ngõ biển Tây Nam thanh bình.',
    teachingPrompt: 'Tích hợp Sinh học & Môi trường: Hệ sinh thái thảm cỏ biển và công tác cứu hộ loài Bò biển Dugong quý hiếm.',
    biodiversity: [
      { name: 'Bò biển Dugong', description: 'Loài thú biển hiếm có quý giá cư ngụ tại các thảm cỏ biển Phú Quốc', isEndangered: true },
      { name: 'Cá cơm than Phú Quốc', description: 'Nguyên liệu làm nên thương hiệu nước mắm truyền thống trứ danh' },
      { name: 'Sao biển đỏ Bãi Sao', description: 'Những cánh sao biển tô điểm cho bờ cát trắng mịn như kem' },
    ],
    historicalHighlight: {
      year: 'Vùng biển Tây Nam',
      event: 'Vùng biển giàu tiềm năng kinh tế và vị trí chiến lược bảo vệ an ninh biên giới hải phận Tây Nam.',
    },
  },
  {
    month: 6,
    islandName: 'Côn Đảo',
    archipelago: 'Huyện Côn Đảo',
    province: 'Bà Rịa - Vũng Tàu',
    coordinates: '8°41′B 106°36′Đ',
    title: 'Côn Đảo - Bản Hùng Ca Bất Tử & Kỳ Quan Bảo Tồn Rùa Biển',
    mottoQuote: 'Đất thiêng tạc dạ triệu đời ghi, sóng biếc nghìn năm hát lời tri ân.',
    authorQuote: 'Vườn quốc gia Côn Đảo',
    image: TRUONG_SA_IMAGE,
    story: 'Côn Đảo không chỉ là trang sử hào hùng ghi dấu ý chí kiên trung của các chiến sĩ cách mạng, mà hôm nay còn là một thiên đường sinh thái nguyên sơ với những rạn san hô rực rỡ và những đêm hè hồi hộp ngắm rùa mẹ đẻ trứng.',
    teachingPrompt: 'Tích hợp Lịch sử lớp 9: Tinh thần kiên trung bất khuất của chị Võ Thị Sáu và các chiến sĩ cách mạng Côn Đảo.',
    biodiversity: [
      { name: 'Rùa biển Vích (Chelonia mydas)', description: 'Nơi bảo tồn và ấp nở rùa biển lớn nhất Đông Nam Á, đón hàng vạn cá thể con về biển' },
      { name: 'Sóc đen Côn Đảo', description: 'Loài đặc hữu chỉ có tại những tán rừng nguyên sinh Côn Đảo' },
    ],
    historicalHighlight: {
      year: '1992',
      event: 'Thành lập Vườn Quốc gia Côn Đảo và công nhận Khu di tích lịch sử Quốc gia đặc biệt.',
    },
  },
  {
    month: 7,
    islandName: 'Bạch Long Vĩ',
    archipelago: 'Huyện đảo Bạch Long Vĩ',
    province: 'Thành phố Hải Phòng',
    coordinates: '20°08′B 107°43′Đ',
    title: 'Bạch Long Vĩ - Cánh Buồm Trắng Giữa Vịnh Bắc Bộ',
    mottoQuote: 'Đảo xa tiền tiêu giữa mênh mông vịnh sóng, thắp sáng niềm tin của ngư dân bám biển.',
    authorQuote: 'Đảo Thanh niên Việt Nam',
    image: HERO_IMAGE,
    story: 'Nằm cách đất liền Hải Phòng hơn 130km, đảo Bạch Long Vĩ như chiếc đuôi rồng trắng hiên ngang giữa sóng gió. Đây là âu cảng trú bão an toàn cho hàng ngàn lượt tàu thuyền đánh cá của bà con ngư dân cả nước.',
    teachingPrompt: 'Tích hợp Công nghệ & Đời sống: Mô hình âu cảng tránh trú bão và năng lượng gió, mặt trời trên hải đảo.',
    biodiversity: [
      { name: 'Bào ngư Bạch Long Vĩ', description: 'Đặc sản quý hiếm được mệnh danh là vàng của đáy biển' },
      { name: 'Cá mực & Cá mú', description: 'Ngư trường trù phú hàng đầu vùng biển Bắc Bộ' },
    ],
    historicalHighlight: {
      year: '1993',
      event: 'Tổng đội Thanh niên Xung phong ra đảo lập nghiệp, biến hòn đảo hoang sơ thành Đảo Thanh niên trù phú.',
    },
  },
  {
    month: 8,
    islandName: 'Đảo Cô Tô',
    archipelago: 'Huyện đảo Cô Tô',
    province: 'Tỉnh Quảng Ninh',
    coordinates: '20°59′B 107°46′Đ',
    title: 'Cô Tô - Hòn Ngọc Bích Vùng Đông Bắc',
    mottoQuote: 'Sau trận bão, chân trời ngấn bể sạch như tấm kính lau hết bụi... biển rạng rỡ tinh khôi.',
    authorQuote: 'Nhà văn Nguyễn Tuân',
    image: LY_SON_IMAGE,
    story: 'Bãi đá Cầu Mỵ với những tầng trầm tích hàng vạn năm bị sóng biển mài giũa tạo nên tuyệt tác thiên nhiên. Đứng trên đỉnh ngọn hải đăng Cô Tô, tầm mắt bạn sẽ thu trọn biển trời Đông Bắc lộng gió.',
    teachingPrompt: 'Tích hợp Ngữ văn lớp 6-7: Đọc hiểu văn bản "Cô Tô" của Nguyễn Tuân - nghệ thuật miêu tả cảnh sắc biển đảo.',
    biodiversity: [
      { name: 'Rừng chõi nguyên sinh', description: 'Cánh rừng ôm sát mép sóng nở hoa vàng rực rỡ vào mỗi độ sang hè' },
      { name: 'Ốc móng tay & Hải sâm', description: 'Hệ động vật thân mềm phong phú ven các bãi đá trầm tích Cầu Mỵ' },
    ],
    historicalHighlight: {
      year: '1961',
      event: 'Bác Hồ ra thăm đồng bào và chiến sĩ đảo Cô Tô. Nơi đây là nơi duy nhất Bác đồng ý cho dựng tượng khi còn sống.',
    },
  },
  {
    month: 9,
    islandName: 'Quần đảo Cát Bà',
    archipelago: 'Huyện Cát Hải',
    province: 'Thành phố Hải Phòng',
    coordinates: '20°47′B 107°00′Đ',
    title: 'Cát Bà - Di Sản Thiên Nhiên Thế Giới & Vịnh Lan Hạ',
    mottoQuote: 'Rừng vàng biển bạc giao hòa, đảo đá nhấp nhô soi bóng làn nước ngọc.',
    authorQuote: 'Khu dự trữ sinh quyển thế giới',
    image: LY_SON_IMAGE,
    story: 'Với 367 hòn đảo lớn nhỏ và Vịnh Lan Hạ êm đềm, Cát Bà sở hữu hệ sinh thái rừng ngập mặn, rừng trên núi đá vôi và rạn san hô độc nhất vô nhị. Một điểm hẹn tuyệt vời cho tuổi trẻ yêu khám phá thiên nhiên.',
    teachingPrompt: 'Tích hợp môn Khoa học tự nhiên & Địa lý: Di sản karst nhiệt đới ngập nước và bảo tồn linh trưởng Voọc Cát Bà.',
    biodiversity: [
      { name: 'Voọc Cát Bà (Trachypithecus poliocephalus)', description: 'Loài linh trưởng quý hiếm bậc nhất thế giới, chỉ còn khoảng 80 cá thể', isEndangered: true },
      { name: 'Cây Kim Giao', description: 'Loài gỗ quý mọc trên những dãy núi đá vôi hùng vĩ' },
    ],
    historicalHighlight: {
      year: '2023',
      event: 'UNESCO chính thức ghi danh Vịnh Hạ Long - Quần đảo Cát Bà là Di sản Thiên nhiên Thế giới liên tỉnh đầu tiên.',
    },
  },
  {
    month: 10,
    islandName: 'Cù Lao Chàm',
    archipelago: 'Thành phố Hội An',
    province: 'Tỉnh Quảng Nam',
    coordinates: '15°57′B 108°30′Đ',
    title: 'Cù Lao Chàm - Hòn Đảo Xanh Không Rác Thải Nhựa',
    mottoQuote: 'Đảo không dùng túi nilon - hành động nhỏ kiến tạo tương lai biển xanh bền vững.',
    authorQuote: 'Mô hình tiên phong Cù Lao Chàm',
    image: HERO_IMAGE,
    story: 'Cù Lao Chàm là tấm gương sáng toàn quốc về ý thức bảo vệ môi trường biển. Nơi đây từng là thương cảng sầm uất trên Con đường Tơ lụa trên biển, sở hữu những giếng cổ Chăm nghìn năm nước vẫn ngọt lành.',
    teachingPrompt: 'Tích hợp GDCD & Lịch sử: Giáo dục phát triển bền vững và vai trò cảng thị Hội An - Cù Lao Chàm trong lịch sử.',
    biodiversity: [
      { name: 'Cua Đá Cù Lao Chàm', description: 'Loài cua ăn lá rừng thảo dược, được dán tem quản lý khai thác bền vững' },
      { name: 'Chim Yến Hàng', description: 'Những đàn yến làm tổ trong hang đá cheo leo giữa sóng biển' },
    ],
    historicalHighlight: {
      year: '2009',
      event: 'Cù Lao Chàm trở thành địa phương đầu tiên của Việt Nam phát động phong trào "Nói không với túi nilon".',
    },
  },
  {
    month: 11,
    islandName: 'Mắt Thần Hải Đăng & Hòn Mê - Đảo Mắt',
    archipelago: 'Vùng biển Duyên hải Miền Trung',
    province: 'Thanh Hóa - Nghệ An - Phú Yên',
    coordinates: '12°53′B 109°27′Đ',
    title: 'Hải Đăng Việt Nam - Ngọn Mắt Thần Bền Bỉ Soi Sáng Đại Dương',
    mottoQuote: 'Đèn biển không bao giờ tắt, như trái tim người giữ biển luôn ấm nóng yêu thương.',
    authorQuote: 'Người gác đèn biển Việt Nam',
    image: TRUONG_SA_IMAGE,
    story: 'Từ mũi Sa Vĩ đến mũi Cà Mau, những ngọn hải đăng sừng sững như những người lính gác thầm lặng. Tại hải đăng Mũi Điện (Đại Lãnh, Phú Yên), bạn sẽ là người đón những tia nắng mặt trời đầu tiên xuất hiện trên dải đất liền hình chữ S.',
    teachingPrompt: 'Tích hợp Vật lý & Công nghệ: Nguyên lý hoạt động thấu kính Fresnel hải đăng và hệ thống pin năng lượng mặt trời.',
    biodiversity: [
      { name: 'Chim Nhạn & Én biển', description: 'Bạn đồng hành thân thiết của những người gác hải đăng trong đêm vắng' },
      { name: 'Thảm thực vật bãi cồn cát', description: 'Cây muống biển bừng sắc tím chắn gió cát biển Miền Trung' },
    ],
    historicalHighlight: {
      year: 'Hệ thống Hải đăng Quốc gia',
      event: 'Gần 100 ngọn hải đăng dọc bờ biển và hải đảo Việt Nam ngày đêm bảo đảm an toàn hàng hải quốc tế.',
    },
  },
  {
    month: 12,
    islandName: 'Trái Tim Hướng Về Biển Đảo Quê Hương',
    archipelago: 'Biển Đông Việt Nam',
    province: 'Khắp mọi miền Tổ quốc',
    coordinates: '3.260 km bờ biển',
    title: 'Khát Vọng Biển Xanh 2027 - Tuổi Trẻ Nối Tiếp Tự Hào',
    mottoQuote: 'Nước Việt Nam là một, biển đảo Việt Nam là một. Sông có thể cạn, đá có thể mòn, song chân lý ấy không bao giờ thay đổi!',
    authorQuote: 'Ý chí non sông',
    image: HERO_IMAGE,
    story: 'Biển đảo là một phần máu thịt thiêng liêng của Tổ quốc Việt Nam. Thế hệ Teen hôm nay nuôi dưỡng tình yêu biển đảo không chỉ bằng cảm xúc mà bằng tri thức, hành động cụ thể, học tập thật tốt để mai này làm chủ biển trời, xây dựng đất nước phồn vinh.',
    teachingPrompt: 'Tổng kết phong trào năm học: Dự án học tập liên môn "Chúng em với Biển đảo quê hương" tại trường THCS.',
    biodiversity: [
      { name: 'Hệ sinh thái biển Việt Nam', description: 'Hơn 11.000 loài sinh vật biển tạo nên kho tàng đại dương phong phú bậc nhất' },
      { name: 'Rạn san hô biển Đông', description: 'Lá phổi xanh dưới đáy đại dương cần tuổi trẻ chung tay gìn giữ' },
    ],
    historicalHighlight: {
      year: '22/12 hàng năm',
      event: 'Kỷ niệm Ngày thành lập Quân đội Nhân dân Việt Nam và Ngày hội Quốc phòng Toàn dân.',
    },
  },
];
