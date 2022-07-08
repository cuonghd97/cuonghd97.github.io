# Monolithic Architecture
### Context
Bạn đang phát triển một ứng dụng server-side. Ứng dụng của bạn phải hỗ trợ rất nhiều các client khác nhau ví dụ như 
trình duyệt desktop, trình duyệt mobile và các ứng dụng cho thiết bị di động. Phải có các API cho
các ứng dụng bên thứ 3 gọi. Ứng dụng của bạn có thể tích hợp với các ứng dụng khác qua web service hoặc message broker.
Ứng dụng phải xử lý các HTTP request theo logic của nghiệp vụ, truy cập vào database, gửi - nhận message với các hệ thống
khác và trả về các response dạng HTML/JSON/XML. 
### Problem
Vấn đề đặt ra là sẽ dùng kiến trúc triển khai nào cho ứng dụng ta vừa nêu trên.
### Force
+ Có một nhóm các developer đang phát triển ứng dụng.
+ Những thành viên mới phải nhanh chóng làm việc hiệu quả.
+ Ứng dụng đang phát triển phải dễ hiểu và dễ sửa đổi.
+ Bạn muốn áp dụng `Continuous Deployment` cho ứng dụng.
+ Bạn phải chạy nhiều instance của ứng dụng trên nhiều máy để đáp ứng các yêu cầu về khả năng mở rộng và tính khả dụng.
+ Bạn muốn tận dụng các công nghệ mới nổi (frame works, ngôn ngữ lập trình,...).
### Solution
Hướng giải quyết là xây dựng một ứng dụng với kiến trúc `monolithic`
### Example
Giả sử bạn đang xây dụng một ứng dụng thương mại điện tử, ứng dụng này sẽ nhận order từ phía khách hàng, quản lý 
kho và ship hàng. Ứng dụng của bạn sẽ gồm các thành phần `StoreFrontUI` đây sẽ là giao diện của ứng dụng và các
backend service có chức năng như quản lý tiền trong tài khoản, quản lý hàng tồn kho và quản lý shipping.

Ứng dụng này sẽ được triển khải theo kiến trúc `monolithic`. Ví dụ ứng dụng đó sẽ là một ứng dụng Java Web gồm một file
WAR được chạy trên web container ví dụ như Tomcat. Bạn có thể chạy nhiều instance của ứng dụng để mở rộng và cải thiện
tính khả dụng.

![monolithic-design](monolithic-design.jpg)

### Resulting context
Hướng giải quyết này cũng đem lại một số lợi ích:
+ Đơn giản để phát triển - các công cụ và các IDE hiện tại đều hỗ trợ việc phát triển `monolithic application`.
+ Đơn giản để triển khai - rất đơn giản để deploy một file war hay cả thư mục chứa project, bạn chỉ cần chạy một dòng lệnh.
+ Đơn giản để mở rộng - bạn có thể mở rộng ứng dụng bằng cách chạy nhiều instance của ứng dụng.

Tuy nhiên, khi mà ứng dụng trở nên to hơn và tăng số lượng người trong đội phát triển, cách tiếp cận này sẽ có một số 
nhược điểm đáng kể:
+ Khi mà lượng code base lớn sẽ gây khó khăn cho những người mới tham gia phát triển. Ứng dụng sẽ trở nên khó khăn
để hiểu và sửa. Do đó rất khó để thực hiện chính xác một thay đổi.
+ Lượng code base lớn cũng sẽ làm giảm khả năng xử lý của IDE, dẫn đến giảm năng xuất phát triển phần mềm.
+ Ứng dụng càng lớn sẽ khởi động càng lâu, do đó sẽ ảnh hưởng đến thời gian triển khai (deploy).
+ `Continuous deployment` sẽ rất khó khăn, mỗi khi cập nhật tính năng mới sẽ phải deploy lại toàn bộ ứng dụng. Điều này sẽ làm
gián đoạn các hành dộng của người dùng, hoặc ảnh hưởng đến các `background task`.
+ Mở rộng ứng dụng khó khăn, thông thường ứng dụng `monolithic` chỉ có thể mở rộng theo một chiều. Chúng ta có thể
mở rộng với số lượng transaction ngày càng tăng bằng cách chạy nhiều instance của ứng dụng. Khi mà có quá nhiều instance
mỗi instance có thể truy cập vào tất cả dữ liệu, điều đó sẽ làm việc caching giảm hiệu quả, tăng mức tiêu thụ
bộ nhớ và các thao tác I/O. Mỗi thành phần trong ứng dụng sẽ có mức tiêu thụ tài nguyên khác nhau một số sẽ cần tài
nguyên CPU một số sẽ cần bộ nhớ, với kiến trúc `monolithic` ta không thể mở rộng mỗi thành phần một cách độc lập.
+ Ứng dụng `monolithic` cũng ảnh hưởng đến việc phát triển mở rộng quy mô. Ví dụ, chúng ta muốn có UI team, accounting team, inventory team,...
Rắc rối của kiến trúc `monolithic` là rất khó khăn để các team làm việc độc lập.
+ Yêu cầu công nghệ sử dụng phải được hỗ trợ lâu dài. Trong kiến trúc `monolithic` việc chuyển đổi sang các công nghệ mới
rất khó khăn vì ta sẽ phải xậy dựng lại ứng dụng.