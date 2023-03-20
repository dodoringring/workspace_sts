package com.example.demo.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//lombok사용 getter, setter필요없다.
public class MemberVO {
	private String mem_id = null;
	private String mem_pw = null;
	private String mem_name = null;
}
