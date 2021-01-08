<?php
    include("../../include/session.php");
    include("../../include/database.php");
    include("../../include/alerts.php");
    if($session_loggedin == false){
        echo '<script type="text/javascript">parent.window.location.reload();</script>';
        exit();
    }
    $timeNow = date('Y-m-d H:i:s');
?>
<section class="resume-section p-3 p-lg-5 d-flex d-column" id="about">
    <div class="my-auto col-12">
        <h2 class="mb-0">
            <span class="text-primary">Dashboard</span>
        </h2>
        <br/>
        <div class="modal fade" id="calSelectModal" tabindex="-1" role="dialog" aria-labelledby="calSelectModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="calSelectModal">Select Calories</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="col-12 objectContents">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="card" id="addEntryBox">
                    <div class="col-12 text-center">
                        <h4>Add Calories <i class="fas fa-sort-amount-up"></i></h4>
                        <form>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="inputCalTitle">Title</label>
                                        <div class="row">
                                            <div class="col-2">
                                                <button type="button" id="searchCal" class="btn btn-default highlighter" data-toggle="modal" data-target="#calSelectModal">
                                                    <i class="fas fa-search"></i>
                                                </button>
                                            </div>
                                            <div class="col-10">
                                                <input type="text" class="form-control" id="inputCalTitle" placeholder="What did you eat? (Optional)">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="inputCalDate">Date & Time</label>
                                        <input type="datetime" class="form-control" id="inputCalDate" value="<?php echo $timeNow; ?>">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="inputCalAmount">Amount</label>
                                        <input type="number" class="form-control" id="inputCalAmount" placeholder="1">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="inputCal">Calories</label>
                                        <input type="number" class="form-control" id="inputCal" placeholder="Calories">
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-default btn-block highlighter" id="addCalButton">Add</button>
                            <br/>
                        </form>
                    </div>
                </div>
                <br/>
            </div>
            <div class="col-lg-6">
                <div class="card" id="addEntryBox">
                    <div class="col-12 text-center">
                        <h4>Add Weight <i class="fas fa-weight"></i></h4>
                        <form>
                            <div class="form-group">
                                <label for="inputDate">Date & Time</label>
                                <input type="datetime" class="form-control" id="inputDate" value="<?php echo $timeNow; ?>">
                            </div>
                            <div class="form-group">
                                <label for="inputWeight">Weight (Kg)</label>
                                <input type="number" class="form-control" id="inputWeight" placeholder="Your Weight">
                            </div>
                            <button type="button" class="btn btn-default btn-block highlighter" id="addEntryButton">Add</button>
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="facts" style="display: none;">
        </div>
        <div class="row" id="entries" style="display: none;">
        </div>
    </div>
</section>
<script type="text/javascript" src="modul/dashboard/dashboard.min.js"></script>
