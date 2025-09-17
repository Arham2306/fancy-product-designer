/**
 * DateTime Picker Element for Fancy Product Designer
 * Adds datetime picker functionality similar to text elements
 */

(function ($) {
  "use strict";

  // Extend FPD with datetime picker functionality
  if (typeof FancyProductDesigner !== "undefined") {
    // Add datetime picker element type to FPD
    FancyProductDesigner.elementTypes = FancyProductDesigner.elementTypes || {};
    FancyProductDesigner.elementTypes.datetime = "datetime";

    // DateTime picker element class
    FancyProductDesigner.DateTimePicker = function (canvas, options) {
      this.canvas = canvas;
      this.options = $.extend(
        {
          type: "datetime",
          x: 100,
          y: 100,
          width: 200,
          height: 40,
          fill: "#ffffff",
          stroke: "#007bff",
          strokeWidth: 2,
          format: "YYYY-MM-DD HH:mm",
          enableTime: true,
          minDate: null,
          maxDate: null,
          selectedDateTime: new Date().toISOString().slice(0, 16),
          text: "Select Date & Time",
          fontSize: 16,
          fontFamily: "Arial",
          price: 0,
          draggable: true,
          rotatable: false,
          resizable: true,
          removable: true,
        },
        options
      );

      this.element = null;
      this.init();
    };

    FancyProductDesigner.DateTimePicker.prototype = {
      init: function () {
        this.createElement();
        this.attachEvents();
      },

      createElement: function () {
        var self = this;

        // Create a group to contain the datetime picker visual elements
        this.element = new fabric.Group([], {
          left: this.options.x,
          top: this.options.y,
          width: this.options.width,
          height: this.options.height,
          fill: this.options.fill,
          stroke: this.options.stroke,
          strokeWidth: this.options.strokeWidth,
          strokeDashArray: [5, 5],
          selectable: true,
          evented: true,
          hasControls: this.options.resizable,
          hasBorders: true,
          lockRotation: !this.options.rotatable,
          moveCursor: this.options.draggable ? "move" : "default",
          hoverCursor: "pointer",
          type: "datetime-picker",
          price: this.options.price,
          selectedDateTime: this.options.selectedDateTime,
          format: this.options.format,
          enableTime: this.options.enableTime,
          minDate: this.options.minDate,
          maxDate: this.options.maxDate,
        });

        // Create background rectangle
        var background = new fabric.Rect({
          width: this.options.width,
          height: this.options.height,
          fill: this.options.fill,
          stroke: this.options.stroke,
          strokeWidth: this.options.strokeWidth,
          strokeDashArray: [5, 5],
          rx: 5,
          ry: 5,
        });

        // Create text label
        var textLabel = new fabric.Text(this.options.text, {
          fontSize: this.options.fontSize,
          fontFamily: this.options.fontFamily,
          fill: "#333333",
          textAlign: "center",
          originX: "center",
          originY: "center",
          left: this.options.width / 2,
          top: this.options.height / 2,
        });

        // Create calendar icon
        var calendarIcon = new fabric.Text("📅", {
          fontSize: this.options.fontSize,
          originX: "center",
          originY: "center",
          left: this.options.width - 20,
          top: this.options.height / 2,
          selectable: false,
        });

        // Add elements to group
        this.element.addWithUpdate(background);
        this.element.addWithUpdate(textLabel);
        this.element.addWithUpdate(calendarIcon);

        // Add to canvas
        this.canvas.add(this.element);

        return this.element;
      },

      attachEvents: function () {
        var self = this;

        // Handle double-click to open datetime picker
        this.element.on("mousedblclick", function () {
          self.openDateTimePicker();
        });

        // Handle selection styling
        this.element.on("selected", function () {
          self.element.set({
            stroke: "#0066cc",
            strokeWidth: 3,
          });
          self.canvas.renderAll();
        });

        this.element.on("deselected", function () {
          self.element.set({
            stroke: self.options.stroke,
            strokeWidth: self.options.strokeWidth,
          });
          self.canvas.renderAll();
        });
      },

      openDateTimePicker: function () {
        var self = this;

        // Create modal for datetime picker
        var modal = $(
          '<div class="fpd-datetime-modal">' +
            '<div class="fpd-datetime-content">' +
            "<h3>Select Date & Time</h3>" +
            '<input type="datetime-local" class="fpd-datetime-input" value="' +
            this.element.selectedDateTime +
            '">' +
            '<div class="fpd-datetime-buttons">' +
            '<button class="fpd-btn fpd-datetime-ok">OK</button>' +
            '<button class="fpd-btn fpd-datetime-cancel">Cancel</button>' +
            "</div>" +
            "</div>" +
            "</div>"
        );

        // Add modal styles
        modal.css({
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        });

        modal.find(".fpd-datetime-content").css({
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        });

        modal.find(".fpd-datetime-input").css({
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
        });

        modal.find(".fpd-datetime-buttons").css({
          marginTop: "15px",
        });

        modal.find(".fpd-btn").css({
          padding: "8px 16px",
          margin: "0 5px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        });

        modal.find(".fpd-datetime-ok").css({
          backgroundColor: "#007bff",
          color: "#fff",
        });

        modal.find(".fpd-datetime-cancel").css({
          backgroundColor: "#6c757d",
          color: "#fff",
        });

        // Add to body
        $("body").append(modal);

        // Handle OK button
        modal.find(".fpd-datetime-ok").on("click", function () {
          var selectedValue = modal.find(".fpd-datetime-input").val();
          if (selectedValue) {
            self.updateDateTime(selectedValue);
          }
          modal.remove();
        });

        // Handle Cancel button
        modal.find(".fpd-datetime-cancel").on("click", function () {
          modal.remove();
        });

        // Handle click outside modal
        modal.on("click", function (e) {
          if (e.target === modal[0]) {
            modal.remove();
          }
        });

        // Set input constraints
        var input = modal.find(".fpd-datetime-input")[0];
        if (this.element.minDate) {
          input.min = this.element.minDate;
        }
        if (this.element.maxDate) {
          input.max = this.element.maxDate;
        }
      },

      updateDateTime: function (dateTimeValue) {
        this.element.selectedDateTime = dateTimeValue;

        // Format the display text
        var displayText = this.formatDateTime(dateTimeValue);

        // Update the text in the group
        var textObj = this.element.getObjects().find(function (obj) {
          return obj.type === "text" && obj.text !== "📅";
        });

        if (textObj) {
          textObj.set("text", displayText);
          this.canvas.renderAll();
        }

        // Trigger change event
        this.canvas.fire("datetime:changed", {
          target: this.element,
          selectedDateTime: dateTimeValue,
        });
      },

      formatDateTime: function (dateTimeValue) {
        if (!dateTimeValue) return "Select Date & Time";

        var date = new Date(dateTimeValue);
        var format = this.element.format || "YYYY-MM-DD HH:mm";

        // Simple formatting - you could use a library like moment.js for more complex formatting
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        var hours = String(date.getHours()).padStart(2, "0");
        var minutes = String(date.getMinutes()).padStart(2, "0");

        var formatted = format
          .replace("YYYY", year)
          .replace("MM", month)
          .replace("DD", day)
          .replace("HH", hours)
          .replace("mm", minutes);

        return formatted;
      },
    };

    // Extend FPD to add datetime picker to toolbar/UI
    if (typeof FancyProductDesigner.prototype.addDateTime === "undefined") {
      FancyProductDesigner.prototype.addDateTime = function (options) {
        if (!this.currentViewInstance) return;

        var datetimePicker = new FancyProductDesigner.DateTimePicker(
          this.currentViewInstance.fabricCanvas,
          options
        );

        return datetimePicker.element;
      };
    }

    // Enhanced UI integration for FPD
    $(document).ready(function () {
      // Wait for FPD to be fully loaded
      var initDateTime = function () {
        // Add datetime picker to text toolbar/module if it exists
        if ($(".fpd-module-text").length > 0) {
          var datetimeBtn = $(
            '<div class="fpd-tool fpd-tool-datetime" data-tool="datetime" title="Add Date Time Picker">' +
              '<span class="fpd-icon">📅</span>' +
              "<span>DateTime</span>" +
              "</div>"
          );

          // Add styling consistent with FPD tools
          datetimeBtn.css({
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            padding: "10px",
            margin: "5px",
            border: "1px solid #ddd",
            "border-radius": "4px",
            cursor: "pointer",
            background: "#fff",
            transition: "all 0.3s ease",
          });

          datetimeBtn.on("click", function () {
            // Get the FPD instance
            var fpdInstance =
              window.fpdInstance ||
              $(".fpd-container").data("FancyProductDesigner") ||
              window.FancyProductDesigner;

            if (fpdInstance && fpdInstance.currentViewInstance) {
              fpdInstance.addDateTime({
                x: 100,
                y: 100,
              });
            }
          });

          // Add to text module
          $(".fpd-module-text").append(datetimeBtn);
        }

        // Also try to add to general toolbar
        if (
          $(".fpd-toolbar").length > 0 &&
          $(".fpd-tool-datetime").length === 0
        ) {
          var toolbarBtn = $(
            '<div class="fpd-tool fpd-tool-datetime" title="Add DateTime Picker">' +
              '<span class="fpd-icon">📅</span>' +
              "</div>"
          );

          toolbarBtn.on("click", function () {
            var fpdInstance =
              window.fpdInstance ||
              $(".fpd-container").data("FancyProductDesigner") ||
              window.FancyProductDesigner;

            if (fpdInstance && fpdInstance.currentViewInstance) {
              fpdInstance.addDateTime();
            }
          });

          $(".fpd-toolbar").append(toolbarBtn);
        }
      };

      // Try multiple approaches to integrate with FPD
      if (window.FancyProductDesigner || window.fpdInstance) {
        initDateTime();
      } else {
        // Wait for FPD to load
        var checkFPD = setInterval(function () {
          if (
            window.FancyProductDesigner ||
            window.fpdInstance ||
            $(".fpd-container").length > 0
          ) {
            clearInterval(checkFPD);
            setTimeout(initDateTime, 500); // Give it a moment to fully initialize
          }
        }, 100);

        // Stop checking after 10 seconds
        setTimeout(function () {
          clearInterval(checkFPD);
        }, 10000);
      }
    });
  }
})(jQuery);
