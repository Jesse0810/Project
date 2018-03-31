function Greet_time(){
	var now = new Date();
	var hour = now.getHours();
	var tip = "";
	if(hour < 6) {
		tip = "凌晨好,";
	} else if(hour < 9) {
		tip = "早上好,";
	} else if(hour < 12) {
		tip = "上午好,";
	} else if(hour < 14) {
		tip = "中午好,";
	} else if(hour < 17) {
		tip = "下午好,";
	} else if(hour < 19) {
		tip = "傍晚好,";
	} else if(hour < 22) {
		tip = "晚上好,";
	} else {
		tip = "夜里好,";
	}
	return tip;
}