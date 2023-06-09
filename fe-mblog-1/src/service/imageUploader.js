class ImageUploader {
  // 여기에는 상태는 없어요
  //upload함수 구현하기 - 파라미터로 file객체 받아옴
  async upload(file) {
    //upload했다면 그 URL전달
    //파일 업로드는 POST방식으로 처리할 것
    const data = new FormData();
    //input type file에서 선택한 파일에 대한 정보 담기
    data.append("file", file);
    //Cloudinary에서 제공하는 서비스를 이용하여 사용자가 선택한 파일에 대한 URL 정보만 제공받아서 처리하므로 upload_preset은 unsigned로 받을 것
    data.append("upload_preset", "wedyjfvp"); //unsigned - 인증과정 없이 사용할 때
    /*
        POST를 이용하니까 POST에 추가하는 데이터 입력하고 fetch를 이용해서 여기 우리가 URL 만들고
        POST한 거 데이터를 전송한 다음에 완료가 되면 이제 result를 받아서 result에 있는 것을 json으로
        변환해서 리턴해 줄거예요
      */
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/dicavdqzp/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return await result.json();
  }
}

export default ImageUploader;
//https://cloudinary.com/documentation/upload_images
