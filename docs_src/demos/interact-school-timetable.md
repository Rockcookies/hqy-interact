---
layout: demos
title:  School Timetable
---

<div class="demo-timetable row">
	<div class="col-md-3 classes">
		<div class="draggable bg-blue">English</div>
		<div class="draggable bg-red">Science</div>
		<div class="draggable bg-orange">Music</div>
		<div class="draggable bg-green">History</div>
		<div class="draggable bg-pink">Computer</div>
		<div class="draggable bg-blue">Mathematics</div>
		<div class="draggable bg-red">Arts</div>
		<div class="draggable bg-orange">Ethics</div>
	</div>
	<div class="col-md-9">
		<table class="table table-bordered">
			<thead>
				<tr>
					<th class="bg" style="width: 15%;"></th>
					<th class="bg" style="width: 17%;">Monday</th>
					<th class="bg" style="width: 17%;">Tuesday</th>
					<th class="bg" style="width: 17%;">Wednesday</th>
					<th class="bg" style="width: 17%;">Thursday</th>
					<th class="bg" style="width: 17%;">Friday</th>
				</tr>
				<tr>
					<td class="bg">08:00</td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
				</tr>
				<tr>
					<td class="bg">09:00</td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
				</tr>
				<tr>
					<td class="bg">10:00</td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
				</tr>
				<tr>
					<td class="bg">11:00</td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
				</tr>
				<tr>
					<td class="bg">12:00</td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
				</tr>
				<tr>
					<td class="bg">12:00</td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
				</tr>
				<tr>
					<td class="bg">13:00</td>
					<td colspan="5" class="bg">Lunch</td>
				</tr>
				<tr>
					<td class="bg">14:00</td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
				</tr>
				<tr>
					<td class="bg">15:00</td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
				</tr>
				<tr>
					<td class="bg">16:00</td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
					<td class="droppable"></td>
				</tr>
			</thead>
		</table>

	</div>
</div>



<script type="text/javascript">
$('.draggable').hqyDraggable({
	revert: true,
	proxy: 'clone'
});

$('.droppable').hqyDroppable({
	accept: '.draggable',
	onDragEnter:function(){
		$(this).addClass('ht');
	},
	onDragLeave:function(){
		$(this).removeClass('ht');
	},
	onDrop:function(e, source){
		$(this).removeClass('ht');

		if ($(source).hasClass('assigned')){
			$(this).append(source);
		} else {
			var c = $(source).clone().addClass('assigned');
			c.css('position', 'static');
			$(this).empty().append(c);

			c.hqyDraggable({
				revert: true
			});
		}
	}
});



$('.classes').hqyDroppable({
	accept: '.assigned',
	onDragEnter:function(e,source){
		$(source).addClass('trash');
	},
	onDragLeave:function(e,source){
		$(source).removeClass('trash');
	},
	onDrop:function(e,source){
		$(source).remove();
	}
});
</script>


### Overview

Click and drag a class to timetable.

### Setup

{% highlight javascript %}
$('.draggable').hqyDraggable({
  revert: true,
  proxy: 'clone'
});

$('.droppable').hqyDroppable({
  accept: '.draggable',
  onDragEnter:function(){
    $(this).addClass('ht');
  },
  onDragLeave:function(){
    $(this).removeClass('ht');
  },
  onDrop:function(e, source){
    $(this).removeClass('ht');

    if ($(source).hasClass('assigned')){
      $(this).append(source);
    } else {
      var c = $(source).clone().addClass('assigned');
      c.css('position', 'static');
      $(this).empty().append(c);

      c.hqyDraggable({
        revert: true
      });
    }
  }
});



$('.classes').hqyDroppable({
  accept: '.assigned',
  onDragEnter:function(e,source){
    $(source).addClass('trash');
  },
  onDragLeave:function(e,source){
    $(source).removeClass('trash');
  },
  onDrop:function(e,source){
    $(source).remove();
  }
});
{% endhighlight %}


### html
{% highlight html %}
<div class="demo-timetable row">
  <div class="col-md-3 classes">
    <div class="draggable bg-blue">English</div>
    <div class="draggable bg-red">Science</div>
    <div class="draggable bg-orange">Music</div>
    <div class="draggable bg-green">History</div>
    <div class="draggable bg-pink">Computer</div>
    <div class="draggable bg-blue">Mathematics</div>
    <div class="draggable bg-red">Arts</div>
    <div class="draggable bg-orange">Ethics</div>
  </div>
  <div class="col-md-9">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th class="bg" style="width: 15%;"></th>
          <th class="bg" style="width: 17%;">Monday</th>
          <th class="bg" style="width: 17%;">Tuesday</th>
          <th class="bg" style="width: 17%;">Wednesday</th>
          <th class="bg" style="width: 17%;">Thursday</th>
          <th class="bg" style="width: 17%;">Friday</th>
        </tr>
        <tr>
          <td class="bg">08:00</td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
        </tr>
        <tr>
          <td class="bg">09:00</td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
        </tr>
        <tr>
          <td class="bg">10:00</td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
        </tr>
        <tr>
          <td class="bg">11:00</td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
        </tr>
        <tr>
          <td class="bg">12:00</td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
        </tr>
        <tr>
          <td class="bg">12:00</td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
        </tr>
        <tr>
          <td class="bg">13:00</td>
          <td colspan="5" class="bg">Lunch</td>
        </tr>
        <tr>
          <td class="bg">14:00</td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
        </tr>
        <tr>
          <td class="bg">15:00</td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
        </tr>
        <tr>
          <td class="bg">16:00</td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
          <td class="droppable"></td>
        </tr>
      </thead>
    </table>
  </div>
</div>
{% endhighlight %}
