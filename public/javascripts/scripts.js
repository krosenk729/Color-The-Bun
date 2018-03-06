(function(){
	$('table').on('click', '.btn-color-bun.new', function(){
		let which = $(this).data('id');
		console.log('data id...', which);
		$.ajax({
			method: 'PUT',
			url: `/colors/${which}`,
			data: {bunned: 1}
		}).then(()=>{
			$(this).removeClass('new');
			$(this).text('Re-Color');
		});
	});

	$('table').on('click', '.btn-color-bun', function(){
		$('.st4, .st5').css('fill', $(this).data('for'));
	});


	$('table').on('click', '.btn-color-delete', function(){
		let which = $(this).data('id');
		$.ajax({
			method: 'DELETE',
			url: `/colors/${which}`
		});
		$(this).parentsUntil('tbody').remove();
	});


	// client-side updates to prevent page refresh
	$('form').submit(function(event){
		event.preventDefault();
		let color = event.target[0].value;
		$.ajax({
			method: 'POST',
			url: '/colors',
			data: {color}
		}).then(id =>{
			let frag = `<tr>
			<th scope="row">${id}</th>
			<td style="color: ${color}">${color}</td>
			<td>
			<button data-id="${id}" data-for="${color}" class="btn btn-outline-secondary btn-color-bun new" type="button">
			(New!) Color
			</button>
			</td>
			<td>
			<button data-id="${id}" class="btn btn-outline-danger btn-color-delete" type="button">Remove</button>
			</td>
			</tr>`;
			$('table').append(frag);
		});
	});
	
}());