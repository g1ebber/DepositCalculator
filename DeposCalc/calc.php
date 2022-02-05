<?php
$startDate = $_POST['startDate'];
$sum = $_POST['sum'];
$term = $_POST['term'];
$percent = $_POST['percent'];
$sumAdd = $_POST['sumAdd'];

if (date('d.m.Y', strtotime($startDate)) != $startDate) {
	$arr["result"] = 'error';
    $arr["type"] = 'date';
} elseif ($sum < 1000 || $sum > 3000000) {
    $arr["result"] = 'error';
    $arr["type"] = 'sum';
} elseif ($term < 5 || $term > 60) {
    $arr["result"] = 'error';
    $arr["type"] = 'term';
} elseif ($percent < 3 || $percent > 100) {
    $arr["result"] = 'error';
    $arr["type"] = 'percent';
} elseif ($sumAdd < 0 || $sumAdd > 3000000) {
    $arr["result"] = 'error';
    $arr["type"] = 'sumAdd';
} else {

    $sumN = 0;
    $sumP = $sum;
    $percent /= 100;

    for ($i = 0; $i < $term; $i++) {
	    $sumN = 0;
	
        $daysN = (int) date('t',  strtotime($startDate));

        if (date('L',strtotime($startDate)) == 0) {
            $daysY = 365;
        } else if ($startDate.date('L',strtotime($startDate)) == 1) {
            $daysY = 366;
        }
	
	    $sumN =  $sum + ($sum + $sumAdd) * $daysN * ($percent / $daysY);
	    $sum = $sumN + $sumAdd;
	    $startDate = date("d.m.Y",strtotime('+1 MONTH', strtotime($startDate)));
    }

    $arr["result"] = round($sumN);

}

echo json_encode($arr);

?>
