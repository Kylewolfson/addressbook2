// business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.lastName + ", " + this.firstName;
}

function Address(kind, street, city, state) {
  this.kind = kind;
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function () {
  return this.kind + ": " + this.street + ", " + this.city + ", " + this.state;
}

// user interface logic
$(document).ready(function() {

  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                  '<div class="form-group">' +
                                   '<label for="new-kind">Address type:</label>' +
                                   '<select class="form-control address-kind">' +
                                     '<option disabled selected value> -- select an option -- </option>' +
                                     '<option value=H>Home</option>' +
                                     '<option value=W>Work</option>' +
                                     '<option value=O>Other</option>' +
                                   '</select>' +
                                  '</div>' +
                                  '<div class="form-group">' +
                                    '<label for="new-street">Street</label>' +
                                    '<input type="text" class="form-control new-street">' +
                                  '</div>' +
                                  '<div class="form-group">' +
                                    '<label for="new-city">City</label>' +
                                    '<input type="text" class="form-control new-city">' +
                                  '</div>' +
                                  '<div class="form-group">' +
                                    '<label for="new-state">State</label>' +
                                    '<input type="text" class="form-control new-state">' +
                                  '</div>' +
                                '</div>'
);
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    // Collects and uses the inputted address data
    $(".new-address").each(function() {
      var inputtedKind = $(this).find("select.new-kind").val();
      console.log(inputtedKind);
      var inputtedStreet = $(this).find("input.new-street").val();
      console.log(inputtedStreet);
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedKind, inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    $(".new-address").not("#originalAddress").remove();

    // Blanks the fields
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
      // Do we need to re-set the dropdown?
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");

  });
});
