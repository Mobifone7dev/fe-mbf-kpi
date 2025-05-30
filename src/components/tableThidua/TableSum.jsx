export function TableSum(props) {
  return (
    <>
      <h5 className="mb-2 text-center mt-2">Bảng tổng hợp thi đua 23/05 - 30/06</h5>
      <div className="table-responsive  d-flex justify-content-center aligns-item-center">
        <table className="table table-bordered table-sum">
          <thead>
            <tr>
              <th>STT</th>
              <th>Nội dung</th>
              <th>Khánh Hòa</th>
              <th>Đắk Lắk</th>
              <th>Gia Lai</th>
              <th>Phú Yên</th>
              <th>Đắk Nông</th>
              <th>Kon Tum</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Doanh thu Cloud</td>
              {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
                <tr>
              <td>2</td>
              <td>Doanh thu IoT</td>
              {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td>3</td>
              <td>Platform Agri</td>
              {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
          
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
             <tr>
              <td>3.1</td>
              <td>Thuê bao PTM Plaform Agri</td>
              {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
             <tr>
              <td>3.2</td>
              <td>Doanh thu PTM Plaform Agri</td>
              {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
                <tr>
              <td>4</td>
              <td>Thuê bao PTM M2M</td>
              {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Kế hoạch thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Lũy kế thực hiện</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>%THKH thi đua</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
            <tr>
              <td></td>
              <td>Xếp hạng</td>
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <td key={i} className="text-center"></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
